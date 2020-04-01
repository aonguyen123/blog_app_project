import {
    CREATE_POST,
    CREATE_POST_SUCCESS,
    SET_MENTIONS,
    FETCH_POST,
    FETCH_POST_SUCCESS,
    FETCH_POST_OVER,
    FETCH_POSTS_BY_ID,
    FETCH_POSTS_BY_ID_SUCCESS,
    FETCH_POSTS_BY_ID_OVER,
    SIGN_OUT_SUCCESS,
} from './../constants/types';

const initialState = {
    mentions: [],
    posts: [],
    hasMoreItems: true,
    nextPage: 1,
    postsById: [],
    nextPageById: 1,
    hasMoreItemsById: true,
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case CREATE_POST:
            return {
                ...state
            }
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                hasMoreItems: true,
                posts: [],
                nextPage: 1,
                nextPageById: 1,
                postsById: [],
                hasMoreItemsById: true
            }
        case SET_MENTIONS:
            return {
                ...state,
                mentions: [...state.mentions, ...action.payload]
            }
        case FETCH_POST:
            return {
                ...state
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                nextPage: state.nextPage + 1
            }
        case FETCH_POST_OVER:
            return {
                ...state,
                hasMoreItems: false
            }
        case FETCH_POSTS_BY_ID:
            return {
                ...state
            }
        case FETCH_POSTS_BY_ID_SUCCESS:
            return {
                ...state,
                postsById: [...state.postsById, ...action.payload],
                nextPageById: state.nextPageById + 1
            }
        case FETCH_POSTS_BY_ID_OVER:
            return {
                ...state,
                hasMoreItemsById: false
            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                postsById: [],
                nextPageById: 1,
                hasMoreItemsById: true,
                posts: [],
                nextPage: 1,
                hasMoreItems: true
            }
        default:
            return state;
    }
}