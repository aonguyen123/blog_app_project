import {
    SHOW_LOADING_CLICK_BUTTON,
    SHOW_LOADING_FETCH_DATA,
    HIDE_LOADING_CLICK_BUTTON,
    HIDE_LOADING_FETCH_DATA,
    CHANGE_VISIBLE,
    SHOW_ANIMATE,
    HIDE_ANIMATE,
    SHOW_LOADING_DATA,
    HIDE_LOADING_DATA,
    HIDE_LOADING_FETCH_EVENTS,
    SHOW_LOADING_FETCH_EVENTS,
    CHANGE_BREAK,
    CLEAN_USER_BY_ID,
} from './../constants/types';

const initialState = {
    loadingButton: false,
    loadingFetchData: 0,
    loadingData: false,
    loadingFetchEvent: false,
    visible: false,
    isShowAnimate: false,
    typeAnimate: '',
    isBreak: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADING_CLICK_BUTTON:
            return {
                ...state,
                loadingButton: true
            };
        case HIDE_LOADING_CLICK_BUTTON:
            return {
                ...state,
                loadingButton: false
            };
        case SHOW_LOADING_FETCH_DATA:
            return {
                ...state,
                loadingFetchData: state.loadingFetchData + 1
            };
        case HIDE_LOADING_FETCH_DATA:
            return {
                ...state,
                loadingFetchData: state.loadingFetchData - 1,
            };
        case CHANGE_VISIBLE:
            return {
                ...state,
                visible: action.payload
            }
        case SHOW_ANIMATE:
            return {
                ...state,
                isShowAnimate: action.payload.isShow,
                typeAnimate: action.payload.type
            }
        case HIDE_ANIMATE:
            return {
                ...state,
                isShowAnimate: action.payload.isHide,
                typeAnimate: action.payload.type
            }
        case SHOW_LOADING_DATA:
            return {
                ...state,
                loadingData: true
            }
        case HIDE_LOADING_DATA:
            return {
                ...state,
                loadingData: false
            }
        case SHOW_LOADING_FETCH_EVENTS:
            return {
                ...state,
                loadingFetchEvent: true
            }
        case HIDE_LOADING_FETCH_EVENTS:
            return {
                ...state,
                loadingFetchEvent: false
            }
        case CHANGE_BREAK:
            return {
                ...state,
                isBreak: action.payload
            }
        case CLEAN_USER_BY_ID:
            return {
                ...state,
                visible: false
            }
        default:
            return state;
    }
}
