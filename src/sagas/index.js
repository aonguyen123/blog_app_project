import { all, takeLatest } from 'redux-saga/effects';
import {
    CREATE_POST,
    FETCH_POST,
    FETCH_USER,
    GET_DISTRICTS,
    GET_PROVINCES,
    REGISTER,
    SEARCH_USER,
    SIGN_IN,
    SIGN_OUT,
    FETCH_POSTS_BY_ID,
    GET_WEATHER,
    AUTHENTICATED,
    RE_AUTH,
    GET_STATUS_CHATS,
    GET_ROOMS,
    GET_CHATS,
    CHECK_JOIN_ROOM
} from './../constants/types';
import allAuthSaga from './auth.saga';
import allPostSaga from './post.saga';
import allUserSaga from './user.saga';
import allGeocodeSaga from './geocode.saga';
import allChatsSaga from './chats.saga';

function* rootSaga() {
    yield all([
        takeLatest(GET_PROVINCES, allGeocodeSaga.getProvinces),
        takeLatest(GET_DISTRICTS, allGeocodeSaga.getDistricts),
        takeLatest(GET_WEATHER, allGeocodeSaga.getWeatherFlowSaga),

        takeLatest(FETCH_USER, allUserSaga.fetchUserFlowSaga),      
        takeLatest(SEARCH_USER, allUserSaga.searchUserFlowSaga),

        takeLatest(SIGN_IN, allAuthSaga.signInFlowSaga),
        takeLatest(SIGN_OUT, allAuthSaga.signout),
        takeLatest(REGISTER, allAuthSaga.registerFlowSaga),

        takeLatest(CREATE_POST, allPostSaga.createPostFlowSaga),
        takeLatest(FETCH_POST, allPostSaga.fetchPostFlowSaga),
        takeLatest(FETCH_POSTS_BY_ID, allPostSaga.fetchPostByIdFlowSaga),

        takeLatest(AUTHENTICATED, allAuthSaga.authorize),
        takeLatest(RE_AUTH, allAuthSaga.reAuth),

        takeLatest(GET_STATUS_CHATS, allChatsSaga.getStatusChatsFlowSaga),
        takeLatest(GET_ROOMS, allChatsSaga.getRoomsFlowSaga),
        takeLatest(GET_CHATS, allChatsSaga.getChatsFlowSaga),
        takeLatest(CHECK_JOIN_ROOM, allChatsSaga.checkJoinRoomFlowSaga)
    ]);
}

export default rootSaga;
