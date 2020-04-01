import {
    GET_DISTRICTS_ERROR,
    GET_PROVINCES_ERROR,
    INTERNAL_SERVER_ERROR,
    LOGIN_ERRORS,
    REGISTER_ERROR,
} from './../constants/types';

const initialState = {
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INTERNAL_SERVER_ERROR:
            return {
                ...state,
            };
        case LOGIN_ERRORS:
            return {
                ...state,
            };   
        case GET_PROVINCES_ERROR:
            return {
                ...state,
            };
        case GET_DISTRICTS_ERROR:
            return {
                ...state,
            };
        case REGISTER_ERROR:
            return {
                ...state,
            };
        default:
            return state;
    }
}
