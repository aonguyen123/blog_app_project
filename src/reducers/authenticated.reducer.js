import { LOGIN, GET_INFO} from '../constants/types';

const initialState = {};
export default function(state = initialState, action) {
    switch(action.type)
    {
        case LOGIN:
            return action.payload;
        case GET_INFO:
            return action.payload;
        default:
            return state;
    }
}