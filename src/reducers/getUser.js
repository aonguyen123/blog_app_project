import { GET_USER } from './../constants/types';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_USER: 
            return {
                ...state,
                user: action.payload
            }
        default: 
            return state;
    }
}