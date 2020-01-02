import callAPI from '../config/callApi';
import setAuthToken from './../config/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, GET_USER } from '../constants/types';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    callAPI(null, 'api/register', 'POST', user)
        .then(res => history.push('/signin'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const loginUser = (user, history) => dispatch => {
    callAPI(null, 'api/login', 'POST', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            dispatch({
                type: SET_CURRENT_USER,
                payload: decode
            });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const logoutUser = history => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/signin');
};
export const logoutUserSysTem = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const getUser = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    callAPI(token,'me', 'GET', null).then(user => {
        dispatch({
            type: GET_USER,
            payload: user.data
        });
    });

}