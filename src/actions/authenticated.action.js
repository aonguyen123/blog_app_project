import { LOGIN, GET_INFO, GET_ERRORS } from '../constants/types';
import { setAuthToken, setToken, removeToken } from './../config';
import { callAPI, getAccessToken } from '../common';

export const login = (email, password, history) => dispatch => {
    callAPI('/auth/login', 'POST', { email, password })
        .then(res => {
            dispatch({
                type: LOGIN,
                payload: res.data
            });
            setAuthToken(res.data.accessToken);
            setToken(res.data);
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getInfo = history => async dispatch => {
    const result = await getAccessToken(history);
    if (result) {
        callAPI('/user/greet-me-protected?name=aonguyen')
            .then(res => {
                dispatch({
                    type: GET_INFO,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
                removeToken();
                history.push('/not-authenticated');
            });
    }
};
