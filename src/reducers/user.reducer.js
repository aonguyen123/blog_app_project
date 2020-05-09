import {
    SEARCH_USER_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USER,
    SEARCH_USER,
    SIGN_OUT_SUCCESS,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_ID_SUCCESS,
    UPDATE_PHOTOURL_USER_SUCCESS
} from './../constants/types';

const initialState = {
    idUserFetchById: '',
    userFetch: {},
    userSearch: {},
    searchResult: [],
    userInfo: {},
    usersOnline: [],
    userById: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                searchResult: action.payload
            };
        case SEARCH_USER:
            return {
                ...state,
                userSearch: action.payload,
                searchResult: []
            };
        case FETCH_USER:
            return {
                ...state,
                userFetch: action.payload
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                userInfo: {}
            }
        case FETCH_USER_BY_ID:
            return {
                ...state,
                idUserFetchById: action.payload
            }
        case FETCH_USER_BY_ID_SUCCESS:
            return {
                ...state,
                userById: action.payload
            }
        case UPDATE_PHOTOURL_USER_SUCCESS:
            const userInfo = updatePhotoURL(state.userInfo, action.payload);
            return {
                ...state,
                userInfo: {...userInfo}
            }
        default:
            return state;
    }
}

function updatePhotoURL(userInfo, photoURL) {
    userInfo.photoURL = photoURL;
    return userInfo;
}