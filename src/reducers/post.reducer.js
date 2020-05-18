import {
    CREATE_POST_SUCCESS,
    SET_MENTIONS,
    FETCH_POST_SUCCESS,
    FETCH_POST_OVER,
    FETCH_POSTS_BY_ID_SUCCESS,
    FETCH_POSTS_BY_ID_OVER,
    SET_POST,
    SET_URL_IMAGE,
    UNMOUNT_POST_BY_ID,
    LIKE_POST_SUCCESS,
    DISLIKE_POST_SUCCESS,
} from './../constants/types';

const initialState = {
    mentions: [],
    posts: [],
    hasMoreItems: true,
    nextPage: 1,
    postsById: [],
    nextPageById: 1,
    hasMoreItemsById: true,
    post: '',
    urlImages: [],
    isCreatePostSuccess: false
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                hasMoreItems: true,
                posts: [],
                nextPage: 1,
                nextPageById: 1,
                postsById: [],
                hasMoreItemsById: true,
                post: '',
                urlImages: [],
                isCreatePostSuccess: true
            }
        case SET_POST:
            return {
                ...state,
                post: action.payload,
                isCreatePostSuccess: false
            }
        case SET_URL_IMAGE:
            return {
                ...state,
                urlImages: action.payload,
                isCreatePostSuccess: false
            }
        case SET_MENTIONS:
            return {
                ...state,
                mentions: [...state.mentions, ...action.payload]
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload.length === 0 ? action.payload : [...state.posts, ...action.payload],
                nextPage: state.nextPage + 1,
                hasMoreItems: action.payload.length === 0 ? false : true
            }
        case FETCH_POST_OVER:
            return {
                ...state,
                hasMoreItems: false
            }
        case FETCH_POSTS_BY_ID_SUCCESS:
            return {
                ...state,
                postsById: action.payload.length === 0 ? action.payload : [...state.postsById, ...action.payload],
                nextPageById: state.nextPageById + 1,
                hasMoreItemsById: action.payload.length === 0 ? false : true
            }
        case FETCH_POSTS_BY_ID_OVER:
            return {
                ...state,
                hasMoreItemsById: false
            }
        case UNMOUNT_POST_BY_ID:
            return {
                ...state,
                postsById: [],
                hasMoreItemsById: true,
                nextPageById: 1,
                posts: [],
                nextPage: 1,
                hasMoreItems: true
            }
        case LIKE_POST_SUCCESS:
            const { posts, postsById } = handlePost(state.posts,state.postsById, action.payload);
            return {
                ...state,
                posts: [...posts],
                postsById: [...postsById]
            }
        case DISLIKE_POST_SUCCESS:
            const {posts: postsDis, postsById: postByIdDis} = handlePost(state.posts, state.postsById, action.payload);
            return {
                ...state,
                posts: [...postsDis],
                postsById: [...postByIdDis]
            }
        default:
            return state;
    }
}

function handlePost(posts, postsById, post) {
    const index = posts.findIndex(p => p._id === post._id);
    if(index !== -1) {
        posts.splice(index, 1);
        posts.splice(index, 0, post);
    }
    const indexPostByIdUser = postsById.findIndex(p => p._id === post._id);
    if(indexPostByIdUser !== -1) {
        postsById.splice(indexPostByIdUser, 1);
        postsById.splice(indexPostByIdUser, 0, post);
    }
    return {posts, postsById};
}