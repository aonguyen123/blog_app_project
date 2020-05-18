import {
    SHOW_LOADING_CLICK_BUTTON,
    SHOW_LOADING_FETCH_DATA,
    HIDE_LOADING_CLICK_BUTTON,
    HIDE_LOADING_FETCH_DATA,
    CHANGE_VISIBLE,
    SHOW_ANIMATE,
    HIDE_ANIMATE,
} from './../constants/types';

const initialState = {
    loadingButton: false,
    loadingFetchData: false,
    visible: false,
    isShowAnimate: false,
    typeAnimate: ''
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
                loadingFetchData: true
            };
        case HIDE_LOADING_FETCH_DATA:
            return {
                ...state,
                loadingFetchData: false
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
        default:
            return state;
    }
}
