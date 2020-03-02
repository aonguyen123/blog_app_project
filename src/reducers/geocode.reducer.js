import { GET_CURRENT_PLACE } from './../constants/types';

const initialState = {
    geocode: ''
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CURRENT_PLACE:
            return {
                ...state,
                geocode: action.payload
            }
        default:
            return state;
    }
}