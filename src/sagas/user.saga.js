import { call, put, take, race, delay } from 'redux-saga/effects';
import allActions from './../actions';
import { SUCCESS } from './../constants/status_code';
import { SIGN_OUT } from './../constants/types';
import allServices from './../services';
import allAuthSaga from './auth.saga';

function* fetchUser(idUser) {
    try {
        const { response } = yield race({
            response: call(allServices.userService.fetchUser, idUser),
            signout: take(SIGN_OUT)
        });
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        yield put(allActions.errorActions.serverError(e.response.data.message));
    }
}

function* fetchUserFlowSaga({ payload }) {
    const { idUser, history } = payload;
    const { result } = yield race({
        result: call(allAuthSaga.authorize),
        signout: take(SIGN_OUT)
    });
    if (result) {
        const data = yield call(fetchUser, idUser);
        if (data) {
            yield put(allActions.userActions.fetchUserSuccess(data.userData));
        }
    } 
    else if(!result)      
    {
        yield call(allAuthSaga.signout, {payload: {history}});
    }
}

function* searchUser({ payload }) {
    yield put(allActions.uiActions.showLoadingFetchData());
    try {
        const { q } = payload;
        yield delay(500);
        
        const resp = yield call(allServices.userService.searchUser, q);
        const { status, data } = resp;
        if (status === SUCCESS) {
            yield put(allActions.userActions.searchUserSuccess(data));
        }
    } catch (e) {
        const { data } = e.response;
        yield put(allActions.errorActions.serverError(data.message));
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}


const allUserSaga = {
    fetchUserFlowSaga,
    searchUser
};

export default allUserSaga;
