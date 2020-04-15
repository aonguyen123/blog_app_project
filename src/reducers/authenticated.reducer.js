import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTHENTICATED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    RE_AUTH_SUCCESS,
    RE_AUTH_FAIL,
    SIGN_OUT_SUCCESS
} from '../constants/types';

const initialState = {
    isAuth: false,
    isLoading: true,
};
export default function(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuth: true, 
                isLoading: false,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuth: false,
                isLoading: false
            }
        case RE_AUTH_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isLoading: false
            }
        case RE_AUTH_FAIL:
            return {
                ...state,
                isAuth: false,
                isLoading: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                isAuth: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
}
