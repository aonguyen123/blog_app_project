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
} from './../constants/types';

const initialState = {
    loadingButton: false,
    loadingFetchData: 0,
    loadingData: false,
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
        default:
            return state;
    }
}
