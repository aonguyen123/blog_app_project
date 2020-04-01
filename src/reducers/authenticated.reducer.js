import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
} from '../constants/types';

const initialState = {
    message: ''
};
export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
}
