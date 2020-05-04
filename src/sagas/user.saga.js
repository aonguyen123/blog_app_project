import { call, put, delay, select } from 'redux-saga/effects';
import allActions from './../actions';
import { SUCCESS, UNAUTHORIZED } from './../constants/status_code';
import allServices from './../services';
import allAuthSaga from './auth.saga';
import allConfigs from '../config';

function* fetchUser(idUser) {
    try {
        const response = yield call(allServices.userService.fetchUser, idUser);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const payload = yield select(
                    state => state.userReducer.userFetch
                );
                const { idUser } = payload;
                const data = yield call(fetchUser, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.fetchUserError(data.message));
        }
    }
}

function* fetchUserFlowSaga({ payload }) {
    const { idUser } = payload;
    const data = yield call(fetchUser, idUser);
    if (data) {
        yield put(allActions.userActions.fetchUserSuccess(data.userData));
    }
}

function* searchUser(q) {
    try {
        const resp = yield call(allServices.userService.searchUser, q);
        const { status, data } = resp;
        if (status === SUCCESS) {
            return data.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const payload = yield select(
                    state => state.userReducer.userSearch
                );
                const { q } = payload;
                const data = yield call(searchUser, q);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.searchUserError(data.message));
        }
    }
}

function* searchUserFlowSaga({ payload }) {
    yield put(allActions.uiActions.showLoadingFetchData());
    const { q } = payload;
    yield delay(500);
    const data = yield call(searchUser, q);
    if(data) {
        yield put(allActions.userActions.searchUserSuccess(data));
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}
function* fetchUserById(idUser) {
    try {
        const response = yield call(allServices.userService.fetchUserById, idUser);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const payload = yield select(
                    state => state.userReducer.idUserFetchById
                );
                const { idUser } = payload;
                const data = yield call(fetchUserById, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.fetchUserByIdError(data.message));
        }
    }
}
function* fetchUserByIdFlowSaga({payload: {idUser}}) {
    yield put(allActions.uiActions.showLoadingFetchData());
    const data = yield call(fetchUserById, idUser);
    if (data) {
        yield put(allActions.userActions.fetchUserByIdSuccess(data.user));
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}

const allUserSaga = {
    fetchUserFlowSaga,
    searchUserFlowSaga,
    fetchUserByIdFlowSaga
};

export default allUserSaga;
