import {
    ADD_COMMENT_SUCCESS,
    FETCH_COMMENTS_BY_IDPOST_SUCCESS,
    FETCH_COMMENTS_BY_IDPOST,
    LIKE_POST_SUCCESS,
    DISLIKE_POST_SUCCESS,
    DELETE_POST_BY_ID_SUCCESS,
} from '../constants/types';

const initialState = {
    comments: [],
    post: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS_BY_IDPOST:
            return {
                ...state,
                comments: [],
                //post: {}
            }
        case FETCH_COMMENTS_BY_IDPOST_SUCCESS:
            return {
                ...state,
                comments: action.payload.comments,
                post: action.payload.post
            };
        case ADD_COMMENT_SUCCESS:
            const data = addComment(state.post, action.payload);
            return {
                ...state,
                comments: [...state.comments, action.payload],
                post: {...data}
            };
        case LIKE_POST_SUCCESS: 
            return {
                ...state,
                post: action.payload
            }
        case DISLIKE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload
            }
        case DELETE_POST_BY_ID_SUCCESS:
            return {
                ...state,
                post: {},
            }
        default:
            return state;
    }
}

function addComment(post, comment) {
    post.comments.push(comment.idUser._id);
    return post;
}