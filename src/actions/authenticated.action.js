import { message } from 'antd';
import {
    LOGIN_ERRORS,
    LOGIN_SUCCESS,
    REGISTER,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_OUT_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    RE_AUTH,
    RE_AUTH_SUCCESS,
    RE_AUTH_FAIL,
    AUTHENTICATED,
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
    message.success(notice, 4);
    return {
        type: REGISTER_SUCCESS
    };
};
const registerError = error => {
    message.error(error, 4);
    return {
        type: REGISTER_ERROR
    };
};

const signoutSuccess = notice => {
    message.info(notice, 4);
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
    message.success(notice, 4);
    return {
        type: LOGIN_SUCCESS
    };
};
const loginErrors = error => {
    message.error(error, 4);
    return {
        type: LOGIN_ERRORS
    };
};
const authenticated = (accessToken) => {
    return {
        type: AUTHENTICATED,
        payload: { accessToken }
    }
}
const authenticatedFail = () => {
    return {
        type: AUTHENTICATED_FAIL
    }
}
const authenticatedSuccess = () => {
    return {
        type: AUTHENTICATED_SUCCESS,
    }
}
const reAuth = (refreshToken, history) => {
    return {
        type: RE_AUTH,
        payload: { refreshToken, history }
    }
}
const reAuthSuccess = () => {
    return {
        type: RE_AUTH_SUCCESS,
    }
}
const reAuthFail = () => {
    return {
        type: RE_AUTH_FAIL
    }
}

export default {
    reAuth,
    reAuthSuccess,
    reAuthFail,
    authenticated,
    authenticatedFail,
    authenticatedSuccess,
    register,
    registerSuccess,
    registerError,
    signout,
    signoutSuccess,
    signin,
    loginSuccess,
    loginErrors
};
