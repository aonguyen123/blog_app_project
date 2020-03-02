import { GET_ERRORS, GET_ERRORS_PLACE, CLEAN_ERRORS_PLACE, LOGIN_ERRORS, CLEAN_ERRORS_LOGIN } from './../constants/types';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_ERRORS:
            return action.payload;
        case GET_ERRORS_PLACE:
            return action.payload;
        case CLEAN_ERRORS_PLACE:
            return action.payload;
        case LOGIN_ERRORS:
            return action.payload;
        case CLEAN_ERRORS_LOGIN:
            return action.payload;
        default: 
            return state;
    }
}