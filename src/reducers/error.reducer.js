import { FETCH_COMMENTS_BY_IDPOST_ERROR, CLEAN_ERROR, FETCH_POSTS_BY_ID_ERROR, FETCH_USER_BY_ID_ERROR } from "constants/types";


const initialState = {
    isError: false,
    contentError: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_COMMENTS_BY_IDPOST_ERROR:
            return {
                ...state,
                isError: true,
                contentError: action.payload
            }
        case FETCH_POSTS_BY_ID_ERROR:
            return {
                ...state,
                isError: true,
                contentError: action.payload
            }
        case FETCH_USER_BY_ID_ERROR:
            return {
                ...state,
                isError: true,
                contentError: action.payload
            }
        case CLEAN_ERROR:
            return {
                ...state,
                isError: false,
                contentError: ''
            }
        default:
            return state;
    }
}