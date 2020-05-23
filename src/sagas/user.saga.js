import { call, put, delay } from 'redux-saga/effects';
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
    yield put(allActions.uiActions.showLoadingData());
    const { q } = payload;
    yield delay(500);
    const data = yield call(searchUser, q);
    if(data) {
        yield put(allActions.userActions.searchUserSuccess(data));
    }
    yield put(allActions.uiActions.hideLoadingData());
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
function* updatePhotoURL(idUser, photoURL) {
    try {
        const response = yield call(allServices.userService.updatePhotoURL, idUser, photoURL);
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
                const data = yield call(updatePhotoURL, idUser, photoURL);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.updatePhotoURLError(data.message));
        }
    }
}
function* updatePhotoURLFlowSaga({payload: {photoURL, idUser}}) {
    const data = yield call(updatePhotoURL, idUser, photoURL);
    if (data) {
        yield put(allActions.userActions.updatePhotoURLSuccess(data.photoURL));
    }
}
function* updateProfile(values, idUser) {
    try {
        const response = yield call(allServices.userService.updateProfile, values, idUser);
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
                const data = yield call(updateProfile, values, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.updateProfileError(data.message));
        }
    }
}
function* updateProfileFlowSaga({payload: {values, idUser}}) {
    yield put(allActions.uiActions.showLoadingButton());
    const data = yield call(updateProfile, values, idUser);
    if (data) {
        yield put(allActions.userActions.updateProfileSuccess(values, data.message));
    }
    yield put(allActions.uiActions.hideLoadingButton());
}

function* updatePassword(newPass, oldPass, idUser) {
    try {
        const response = yield call(allServices.userService.updatePassword, newPass, oldPass, idUser);
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
                const data = yield call(updatePassword, newPass, oldPass, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.updatePasswordError(data.message));
        }
    }
}
function* updatePasswordFlowSaga({payload: {newPass, oldPass, idUser}}) {
    yield put(allActions.uiActions.showLoadingButton());
    const data = yield call(updatePassword, newPass, oldPass, idUser);
    if (data) {
        yield put(allActions.userActions.updatePasswordSuccess(data.message));
        yield put(allActions.uiActions.changeVisible(false));
    }
    yield put(allActions.uiActions.hideLoadingButton());
}
function* updateInterest(interest, idUser) {
    try {
        const response = yield call(allServices.userService.updateInterest, interest, idUser);
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
                const data = yield call(updateInterest, interest, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.updateInterestError(data.message));
        }
    }
}
function* updateInterestFlowSaga({payload: {interest, idUser}}) {
    const data = yield call(updateInterest, interest, idUser);
    if (data) {
        yield put(allActions.userActions.updateInterestSuccess(data.interest));
    }
}
function* removeInterest(interest, idUser) {
    try {
        const response = yield call(allServices.userService.removeInterest, interest, idUser);
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
                const data = yield call(removeInterest, interest, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.userActions.removeInterestError(data.message));
        }
    }
}
function* removeInterestFlowSaga({payload: {interest, idUser}}) {
    const data = yield call(removeInterest, interest, idUser);
    if(data) {
        yield put(allActions.userActions.removeInterestSuccess(data.interest));
    }
}

const allUserSaga = {
    fetchUserFlowSaga,
    searchUserFlowSaga,
    fetchUserByIdFlowSaga,
    updatePhotoURLFlowSaga,
    updateProfileFlowSaga,
    updatePasswordFlowSaga,
    updateInterestFlowSaga,
    removeInterestFlowSaga
};

export default allUserSaga;
