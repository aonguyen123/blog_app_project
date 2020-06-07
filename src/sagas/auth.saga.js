import { call, put } from 'redux-saga/effects';
import allActions from './../actions';
import {
    SUCCESS,
    UNAUTHORIZED
} from './../constants/status_code';
import allServices from './../services';
import allConfigs from './../config';

function* authorize({ payload }) {
    const { accessToken } = payload;
    try {
        const resp = yield call(allServices.authService.authenticated, accessToken);
        const { status, data } = resp;
        if(status === SUCCESS)
        {
            yield call(allConfigs.setAuthTokenConfigs.setAuthToken, accessToken);
            yield put(allActions.userActions.fetchUserSuccess(data));
            yield put(allActions.authenticatedActions.authenticatedSuccess());
        }
    } catch (error) {
        const { status } = error.response;
        if(status === UNAUTHORIZED) {
            const { refreshToken } = allConfigs.tokenConfigs.getToken();
            yield put(allActions.authenticatedActions.reAuth(refreshToken));
        }
    }
}
function* reAuth({payload}) {
    const { refreshToken } = payload;
    try {
        const resp = yield call(allServices.authService.refreshToken, refreshToken);
        const { data, status } = resp;
        if(status === SUCCESS)
        {
            yield call(allConfigs.tokenConfigs.setToken, {
                accessToken: data.accessToken,
                refreshToken
            });
            yield call(allConfigs.setAuthTokenConfigs.setAuthToken, data.accessToken);
            yield put(allActions.authenticatedActions.reAuthSuccess());
            yield put(allActions.userActions.fetchUserSuccess(data));
            return true;
        }
    } catch (error) {
        const { data } = error.response;
        yield put(allActions.authenticatedActions.reAuthFail(data.message));
        return false;
    }
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
            return response.data;
        }
    } catch (e) {
        const { data } = e.response;
        yield put(
            allActions.authenticatedActions.loginErrors(data.message)
        );
    }
}
function* signInFlowSaga({ payload }) {
    const { email, password, history } = payload;
    yield put(allActions.uiActions.showLoadingButton());
    let data = yield call(signin, email, password);
    if (data) {
        const { accessToken, refreshToken, message } = data;

        yield call(allConfigs.tokenConfigs.setToken, {
            accessToken,
            refreshToken
        });

        yield call(allConfigs.setAuthTokenConfigs.setAuthToken, accessToken);
        yield put(allActions.userActions.fetchUserSuccess(data));
        yield put(allActions.authenticatedActions.loginSuccess(message));
        history.push('/home');
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
        const { data } = e.response;
        yield put(
            allActions.authenticatedActions.registerError(data.message)
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
    registerFlowSaga,
    reAuth
};

export default allAuthSaga;
