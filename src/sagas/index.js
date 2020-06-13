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
    GET_ROOMS,
    GET_CHATS,
    CHECK_JOIN_ROOM,
    FETCH_USER_BY_ID,
    UPDATE_PHOTOURL_USER,
    UPDATE_PROFILE,
    UPDATE_PASSWORD,
    FETCH_MESSAGES_IN_ROOM,
    ADD_COMMENT,
    FETCH_COMMENTS_BY_IDPOST,
    LIKE_POST,
    DISLIKE_POST,
    UPDATE_INTEREST,
    REMOVE_INTEREST,
    SEARCH_MENTIONS,
    FETCH_EVENTS,
    REMOVE_EVENT,
    REMOVE_ALL_EVENT,
    FETCH_HISTORYS,
    LOAD_MORE_POST,
    LOAD_MORE_POST_BY_ID,
    LOAD_MORE_HISTORYS,
    SETTING_PHONE,
    DELETE_POST_BY_ID,
    FETCH_POST_BY_ID_POST
} from './../constants/types';
import allAuthSaga from './auth.saga';
import allPostSaga from './post.saga';
import allUserSaga from './user.saga';
import allGeocodeSaga from './geocode.saga';
import allChatsSaga from './chats.saga';
import allCommentSaga from './comment.saga';
import allEventsSaga from './event.saga';

function* rootSaga() {
    yield all([
        takeLatest(GET_PROVINCES, allGeocodeSaga.getProvinces),
        takeLatest(GET_DISTRICTS, allGeocodeSaga.getDistricts),
        takeLatest(GET_WEATHER, allGeocodeSaga.getWeatherFlowSaga),

        takeLatest(FETCH_USER, allUserSaga.fetchUserFlowSaga),      
        takeLatest(SEARCH_MENTIONS, allUserSaga.searchMentionsFlowSaga),
        takeLatest(FETCH_USER_BY_ID, allUserSaga.fetchUserByIdFlowSaga),
        takeLatest(UPDATE_PHOTOURL_USER, allUserSaga.updatePhotoURLFlowSaga),
        takeLatest(UPDATE_PROFILE, allUserSaga.updateProfileFlowSaga),
        takeLatest(UPDATE_PASSWORD, allUserSaga.updatePasswordFlowSaga),
        takeLatest(UPDATE_INTEREST, allUserSaga.updateInterestFlowSaga),
        takeLatest(REMOVE_INTEREST, allUserSaga.removeInterestFlowSaga),
        takeLatest(SEARCH_USER, allUserSaga.searchUserFlowSaga),
        takeLatest(SETTING_PHONE, allUserSaga.settingPhoneFlowSaga),

        takeLatest(SIGN_IN, allAuthSaga.signInFlowSaga),
        takeLatest(SIGN_OUT, allAuthSaga.signout),
        takeLatest(REGISTER, allAuthSaga.registerFlowSaga),

        takeLatest(CREATE_POST, allPostSaga.createPostFlowSaga),
        takeLatest(FETCH_POST, allPostSaga.fetchPostFlowSaga),
        takeLatest(LOAD_MORE_POST, allPostSaga.loadMorePostFlowSaga),
        takeLatest(FETCH_POSTS_BY_ID, allPostSaga.fetchPostByIdFlowSaga),
        takeLatest(LOAD_MORE_POST_BY_ID, allPostSaga.loadMorePostByIdFlowSaga),
        takeLatest(LIKE_POST, allPostSaga.likePostFlowSaga),
        takeLatest(DISLIKE_POST, allPostSaga.dislikePostFlowSaga),
        takeLatest(DELETE_POST_BY_ID, allPostSaga.deletePostByIdFlowSaga),
        takeLatest(FETCH_POST_BY_ID_POST, allPostSaga.fetchPostByIdPostFlowSaga),

        takeLatest(ADD_COMMENT, allCommentSaga.addCommentFlowSaga),
        takeLatest(FETCH_COMMENTS_BY_IDPOST, allCommentSaga.fetchCommentByIdPostFlowSaga),

        takeLatest(FETCH_EVENTS, allEventsSaga.fetchEventFlowSaga),
        takeLatest(REMOVE_EVENT, allEventsSaga.removeEventFlowSaga),
        takeLatest(REMOVE_ALL_EVENT, allEventsSaga.removeAllEventFlowSaga),
        takeLatest(FETCH_HISTORYS, allEventsSaga.fetchHistorysFlowSaga),
        takeLatest(LOAD_MORE_HISTORYS, allEventsSaga.loadMoreHistorysFlowSaga),

        takeLatest(AUTHENTICATED, allAuthSaga.authorize),
        takeLatest(RE_AUTH, allAuthSaga.reAuth),

        takeLatest(GET_ROOMS, allChatsSaga.getRoomsFlowSaga),
        takeLatest(GET_CHATS, allChatsSaga.getChatsFlowSaga),
        takeLatest(CHECK_JOIN_ROOM, allChatsSaga.checkJoinRoomFlowSaga),
        takeLatest(FETCH_MESSAGES_IN_ROOM, allChatsSaga.fetchMessageInRoomFlowSaga)
    ]);
}

export default rootSaga;
