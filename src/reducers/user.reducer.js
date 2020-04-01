import {
    SEARCH_USER_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USER,
    SEARCH_USER,
    SIGN_OUT_SUCCESS
} from './../constants/types';

const initialState = {
    searchResult: [],
    userInfo: {}
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
                searchResult: []
            };
        case FETCH_USER:
            return {
                ...state
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
        default:
            return state;
    }
}
