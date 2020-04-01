import {
    SHOW_LOADING_CLICK_BUTTON,
    SHOW_LOADING_FETCH_DATA,
    HIDE_LOADING_CLICK_BUTTON,
    HIDE_LOADING_FETCH_DATA,
} from './../constants/types';

const initialState = {
    loadingButton: false,
    loadingFetchData: false,
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
        default:
            return state;
    }
}
