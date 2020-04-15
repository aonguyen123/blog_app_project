import {
    SEARCH_USER,
    SEARCH_USER_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SEARCH_USER_ERROR,
    GET_USERS_ONLINE,
} from './../constants/types';
import { message } from 'antd';

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
const searchUserError = notice => {
    message.error(notice, 4);
    return {
        type: SEARCH_USER_ERROR
    }
}
const fetchUser = (idUser) => {
    return {
        type: FETCH_USER,
        payload: {
            idUser
        }
    };
};
const fetchUserSuccess = data => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data
    };
};
const fetchUserError = notice => {
    message.error(notice, 4);
    return {
        type: FETCH_USER_ERROR
    }
}
const getUsersOnline = users => {
    return {
        type: GET_USERS_ONLINE,
        payload: users
    }
}

export default {
    searchUser,
    searchUserSuccess,
    searchUserError,
    fetchUser,
    fetchUserSuccess,
    fetchUserError,
    getUsersOnline
};
