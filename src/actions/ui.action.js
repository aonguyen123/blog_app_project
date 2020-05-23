import {
    HIDE_LOADING_CLICK_BUTTON,
    HIDE_LOADING_FETCH_DATA,
    SHOW_LOADING_CLICK_BUTTON,
    SHOW_LOADING_FETCH_DATA,
    CHANGE_VISIBLE,
    SHOW_ANIMATE,
    HIDE_ANIMATE,
    SHOW_LOADING_DATA,
    HIDE_LOADING_DATA,
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
        type: HIDE_LOADING_FETCH_DATA,
    };
};
const changeVisible = visible => {
    return {
        type: CHANGE_VISIBLE,
        payload: visible
    }
}
const showAnimate = (isShow, type) => {
    return {
        type: SHOW_ANIMATE,
        payload: {isShow, type}
    }
}
const hideAnimate = (isHide, type) => {
    return {
        type: HIDE_ANIMATE,
        payload: {isHide, type}
    }
}
const showLoadingData = () => {
    return {
        type: SHOW_LOADING_DATA
    }
}
const hideLoadingData = () => {
    return {
        type: HIDE_LOADING_DATA
    }
}

export default {
    showLoadingButton,
    hideLoadingButton,
    showLoadingFetchData,
    hideLoadingFetchData,
    changeVisible,
    showAnimate,
    hideAnimate,
    showLoadingData,
    hideLoadingData
};
