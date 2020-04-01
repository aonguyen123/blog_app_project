import { call, put } from 'redux-saga/effects';
import allActions from './../actions';
import { SUCCESS } from './../constants/status_code';
import allServices from './../services';
import allConfigs from './../config';

function* requestRefreshToken(refreshToken) {
    try {
        const response = yield call(
            allServices.authService.refreshToken,
            refreshToken
        );
        const { data, status } = response;
        if (status === SUCCESS) {
            return data.accessToken;
        }
    } catch (e) {
        yield put(allActions.authenticatedActions.refreshTokenExpired());
        return null;
    }
}

function* authorize() {
    let token = yield call(allConfigs.tokenConfigs.getToken);
    let { accessToken, refreshToken } = token;
    const expired_accessToken = yield call(
        allConfigs.tokenConfigs.checkExpiredToken,
        accessToken
    );
    if (!expired_accessToken) {
        const accessToken = yield call(requestRefreshToken, refreshToken);
        if (accessToken) {
            yield call(allConfigs.tokenConfigs.setToken, {
                accessToken,
                refreshToken
            });
            yield call(
                allConfigs.setAuthTokenConfigs.setAuthToken,
                accessToken
            );
            return true;
        } else {
            return false;
        }
    }
    return true;
}

function* signout({ payload }) {
    const { history } = payload;
    yield call(allConfigs.tokenConfigs.removeToken);
    yield put(allActions.authenticatedActions.signoutSuccess('Logout success'));
    history.push('/login');
}

function* signin(email, password) {
    try {
        const response = yield call(
            allServices.authService.login,
            email,
            password
        );

        if (response.status === SUCCESS) {
            const { message, ...rest } = response.data;
            yield put(allActions.authenticatedActions.loginSuccess(message));
            return rest;
        }
    } catch (e) {
        yield put(
            allActions.authenticatedActions.loginErrors(e.response.data.message)
        );
    }
}
function* signInFlowSaga({ payload }) {
    const { email, password, history } = payload;
    yield put(allActions.uiActions.showLoadingButton());
    let data = yield call(signin, email, password);
    if (data) {
        const { accessToken, refreshToken, _id } = data;

        yield call(allConfigs.tokenConfigs.setToken, {
            accessToken,
            refreshToken
        });
        yield call(allConfigs.tokenConfigs.setIdUser, _id);
        yield call(allConfigs.setAuthTokenConfigs.setAuthToken, accessToken);

        history.push('/');
    }
    yield put(allActions.uiActions.hideLoadingButton());
}

function* register(data) {
    try {
        const resp = yield call(allServices.authService.register, data);
        if (resp.status === SUCCESS) {
            const { message } = resp.data;
            return message;
        }
    } catch (e) {
        yield put(
            allActions.authenticatedActions.registerError(
                e.response.data.message
            )
        );
    }
}

function* registerFlowSaga({ payload }) {
    const { data, history } = payload;
    yield put(allActions.uiActions.showLoadingButton());
    const message = yield call(register, data);
    if (message) {
        yield put(allActions.authenticatedActions.registerSuccess(message));
        history.push('/login');
    }
    yield put(allActions.uiActions.hideLoadingButton());
}

const allAuthSaga = {
    signInFlowSaga,
    signout,
    authorize,
    registerFlowSaga
};

export default allAuthSaga;
