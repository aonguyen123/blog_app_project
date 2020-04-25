import { call, put, select } from 'redux-saga/effects';
import allService from "../services";
import { SUCCESS, UNAUTHORIZED, BAD_REQUSET } from "../constants/status_code";
import allConfigs from "../config";
import allAuthSaga from "./auth.saga";
import allActions from "../actions";

function* getStatusChats() {
    try {
        const response = yield call(allService.chatsService.getStatusChats);
        if(response && response.status === SUCCESS) {
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
                const data = yield call(getStatusChats);
                return data;
            }
            return false;
        } else {
            yield put(allActions.chatsActions.getStatusChatsError(data.message));
        }
    }
}
function* getStatusChatsFlowSaga() {
    const data = yield call(getStatusChats);
    if(data) {
        yield put(allActions.chatsActions.getStatusChatsSuccess(data.statusChats));
    }
}
function* getRooms() {
    try {
        const response = yield call(allService.chatsService.getRooms);
        if(response && response.status === SUCCESS) {
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
                const data = yield call(getRooms);
                return data;
            }
            return false;
        } else {
            yield put(allActions.chatsActions.getRoomsError(data.message));
        }
    }
}
function* getRoomsFlowSaga() {
    const data = yield call(getRooms);
    if(data) {
        yield put(allActions.chatsActions.getRoomsSuccess(data.rooms));
    }
}
function* getChats() {
    try {
        const response = yield call(allService.chatsService.getChats);
        if(response && response.status === SUCCESS) {
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
                const data = yield call(getChats);
                return data;
            }
            return false;
        } else {
            yield put(allActions.chatsActions.getChatsError(data.message));
        }
    }
}
function* getChatsFlowSaga() {
    const data = yield call(getChats);
    if(data) {
        yield put(allActions.chatsActions.getChatsSuccess(data.chats));
    }
}
function* checkJoinRoom(idRoom, idUser, history) {
    try {
        const response = yield call(allService.chatsService.checkJoinRoom, idRoom, idUser);
        if(response && response.status === SUCCESS) {
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
                const { idRoom, idUser, history } = yield select(state => state.chatsReducer.checkJoin);       
                const data = yield call(checkJoinRoom, idRoom, idUser, history);
                return data;
            }
            return false;
        } else if(status === BAD_REQUSET) {
            history.push('/chats');
            yield put(allActions.chatsActions.checkJoinRoomError(data.message));
        } else {
            yield put(allActions.chatsActions.checkJoinRoomError(data.message));
        }
    }
}
function* checkJoinRoomFlowSaga({payload: {idRoom, idUser, history}}) {
    yield put(allActions.uiActions.showLoadingFetchData());
    const data = yield call(checkJoinRoom, idRoom, idUser, history);
    if(data) {
        yield put(allActions.chatsActions.checkJoinRoomSuccess(data.data));
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}

const allChatsSaga = {
    getStatusChatsFlowSaga,
    getRoomsFlowSaga,
    getChatsFlowSaga,
    checkJoinRoomFlowSaga
}

export default allChatsSaga;