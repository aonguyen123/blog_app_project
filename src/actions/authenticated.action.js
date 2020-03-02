import { LOGIN, GET_INFO, GET_ERRORS, LOGIN_ERRORS, CLEAN_ERRORS_LOGIN } from '../constants/types';
import { setAuthToken, setToken, removeToken } from './../config';
import { callAPI, getAccessToken } from '../common';

const login = (email, password, history) => dispatch => {
    callAPI('/auth/login', 'POST', { email, password })
        .then(res => {
            dispatch({
                type: LOGIN,
                payload: res.data
            });
            dispatch({
                type: CLEAN_ERRORS_LOGIN,
                payload: {}
            })
            setAuthToken(res.data.accessToken);
            setToken(res.data);
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERRORS,
                payload: err.response.data
            });
        });
};

const getInfo = history => async dispatch => {
    const result = await getAccessToken(history);
    if (result) {
        callAPI('/user/greet-me-protected?name=aonguyen')
            .then(res => {
                dispatch({
                    type: GET_INFO,
                    payload: res.data
                })
            })
            .catch(err => {
                removeToken();
                history.push('/not-authenticated');
                dispatch ({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    }
};
export default {
    login,
    getInfo
}