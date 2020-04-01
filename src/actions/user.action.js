import {
    SEARCH_USER,
    SEARCH_USER_SUCCESS,

    FETCH_USER,
    FETCH_USER_SUCCESS,
} from './../constants/types';

const searchUser = q => {
    return {
        type: SEARCH_USER,
        payload: { q }
    };
};
const searchUserSuccess = data => {
    return {
        type: SEARCH_USER_SUCCESS,
        payload: data
    };
};
const fetchUser = (idUser, history) => {
    return {
        type: FETCH_USER,
        payload: {
            idUser,
            history
        }
    };
};
const fetchUserSuccess = data => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data
    };
};


export default {
    searchUser,
    searchUserSuccess,
    fetchUser,
    fetchUserSuccess
};
