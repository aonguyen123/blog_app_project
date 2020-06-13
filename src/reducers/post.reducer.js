import {
    CREATE_POST_SUCCESS,
    SET_MENTIONS,
    FETCH_POST_SUCCESS,
    FETCH_POST_OVER,
    FETCH_POSTS_BY_ID_SUCCESS,
    FETCH_POSTS_BY_ID_OVER,
    UNMOUNT_POST_BY_ID,
    LIKE_POST_SUCCESS,
    DISLIKE_POST_SUCCESS,
    DELETE_POST_BY_ID_SUCCESS,
    FETCH_POST_BY_ID_POST_SUCCESS,
    CLEAR_POST_BY_ID_POST
} from './../constants/types';

const initialState = {
    mentions: [],
    posts: [],
    hasMoreItems: false,
    nextPage: 1,
    postsById: [],
    nextPageById: 1,
    hasMoreItemsById: false,
    post: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_POST_SUCCESS:
            return {
                ...state,                
                hasMoreItems: false,
                posts: [],
                nextPage: 1,
            };
        case SET_MENTIONS:
            return {
                ...state,
                mentions: [...state.mentions, ...action.payload]
            };
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                nextPage: state.nextPage + 1,
                hasMoreItems: true
            };
        case FETCH_POST_OVER:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                hasMoreItems: false
            };
        case FETCH_POSTS_BY_ID_SUCCESS:
            return {
                ...state,
                postsById: [...state.postsById, ...action.payload],
                nextPageById: state.nextPageById + 1,
                hasMoreItemsById: true
            };
        case FETCH_POSTS_BY_ID_OVER:
            return {
                ...state,
                postsById: [...state.postsById, ...action.payload],
                hasMoreItemsById: false
            };
        case UNMOUNT_POST_BY_ID:
            return {
                ...state,
                postsById: [],
                hasMoreItemsById: false,
                nextPageById: 1,
                posts: [],
                nextPage: 1,
                hasMoreItems: false
            };
        case LIKE_POST_SUCCESS:
            const { posts, postsById } = handlePost(
                state.posts,
                state.postsById,
                action.payload
            );
            return {
                ...state,
                posts: [...posts],
                postsById: [...postsById]
            };
        case DISLIKE_POST_SUCCESS:
            const { posts: postsDis, postsById: postByIdDis } = handlePost(
                state.posts,
                state.postsById,
                action.payload
            );
            return {
                ...state,
                posts: [...postsDis],
                postsById: [...postByIdDis],
            };
        case DELETE_POST_BY_ID_SUCCESS:
            const { posts: deletePosts, postsById: deletePostsById } = deletePost(state.posts, state.postsById, action.payload);
            return {
                ...state,
                posts: [...deletePosts],
                postsById: [...deletePostsById]
            }
        case FETCH_POST_BY_ID_POST_SUCCESS:
            return {
                ...state,
                post: action.payload
            }
        case CLEAR_POST_BY_ID_POST:
            return {
                ...state,
                post: {}
            }
        default:
            return state;
    }
}

function handlePost(posts, postsById, post) {
    const index = posts.findIndex(p => p._id === post._id);
    if (index !== -1) {
        posts.splice(index, 1);
        posts.splice(index, 0, post);
    }
    const indexPostByIdUser = postsById.findIndex(p => p._id === post._id);
    if (indexPostByIdUser !== -1) {
        postsById.splice(indexPostByIdUser, 1);
        postsById.splice(indexPostByIdUser, 0, post);
    }
    return { posts, postsById };
}
function deletePost(posts, postsById, idPost) {
    const indexPost = posts.findIndex(post => post._id === idPost);
    if(indexPost !== -1) {
        posts.splice(indexPost, 1);
    }
    const indexPostById = postsById.findIndex(post => post._id === idPost);
    if(indexPostById !== -1) {
        postsById.splice(indexPostById, 1);
    }
    return {posts, postsById};
}
