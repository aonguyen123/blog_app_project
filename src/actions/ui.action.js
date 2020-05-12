import {
    HIDE_LOADING_CLICK_BUTTON,
    HIDE_LOADING_FETCH_DATA,
    SHOW_LOADING_CLICK_BUTTON,
    SHOW_LOADING_FETCH_DATA,
    CHANGE_VISIBLE,
} from './../constants/types';

const showLoadingButton = () => {
    return {
        type: SHOW_LOADING_CLICK_BUTTON
    };
};
const hideLoadingButton = () => {
    return {
        type: HIDE_LOADING_CLICK_BUTTON
    };
};
const showLoadingFetchData = () => {
    return {
        type: SHOW_LOADING_FETCH_DATA
    };
};
const hideLoadingFetchData = () => {
    return {
        type: HIDE_LOADING_FETCH_DATA
    };
};
const changeVisible = visible => {
    return {
        type: CHANGE_VISIBLE,
        payload: visible
    }
}

export default {
    showLoadingButton,
    hideLoadingButton,
    showLoadingFetchData,
    hideLoadingFetchData,
    changeVisible
};
