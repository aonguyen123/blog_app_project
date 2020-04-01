import { message } from 'antd';
import {
    LOGIN_ERRORS,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_EXPIRED,
    REGISTER,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_OUT_SUCCESS,
} from '../constants/types';

const register = (data, history) => {
    return {
        type: REGISTER,
        payload: {
            data,
            history
        }
    };
};
const registerSuccess = notice => {
    message.success(notice);
    return {
        type: REGISTER_SUCCESS
    };
};
const registerError = error => {
    message.error(error);
    return {
        type: REGISTER_ERROR
    };
};

const signoutSuccess = notice => {
    message.info(notice);
    return {
        type: SIGN_OUT_SUCCESS
    };
};
const signout = (history) => {
    return {
        type: SIGN_OUT,
        payload: {
            history
        }
    };
};

const signin = (email, password, history) => {
    return {
        type: SIGN_IN,
        payload: {
            email,
            password,
            history
        }
    };
};
const loginSuccess = notice => {
    message.success(notice);
    return {
        type: LOGIN_SUCCESS
    };
};
const loginErrors = error => {
    message.error(error);
    return {
        type: LOGIN_ERRORS
    };
};
const refreshTokenExpired = () => {
    return {
        type: REFRESH_TOKEN_EXPIRED
    };
};

export default {
    register,
    registerSuccess,
    registerError,

    refreshTokenExpired,

    signout,
    signoutSuccess,
    signin,
    loginSuccess,
    loginErrors
};
