import { message } from 'antd';
import {
    CREATE_POST,
    CREATE_POST_ERROR,
    CREATE_POST_SUCCESS,
    FETCH_POST,
    FETCH_POST_OVER,
    FETCH_POST_SUCCESS,
    SET_MENTIONS,
    FETCH_POSTS_BY_ID,
    FETCH_POSTS_BY_ID_SUCCESS,
    FETCH_POSTS_BY_ID_OVER
} from './../constants/types';

const createPost = (formData, history) => {
    return {
        type: CREATE_POST,
        payload: {
            formData,
            history
        }
    };
};
const createPostSuccess = (notice, newPost) => {
    message.success(notice);
    return {
        type: CREATE_POST_SUCCESS,
        payload: newPost
    };
};
const createPostError = error => {
    message.error(error);
    return {
        type: CREATE_POST_ERROR
    };
};
const setMentions = mentions => {
    return {
        type: SET_MENTIONS,
        payload: mentions
    };
};
const fetchPost = (history, page, page_size) => {
    return {
        type: FETCH_POST,
        payload: {
            history,
            page,
            page_size
        }
    };
};
const fetchPostSuccess = (data) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: data
    };
};
const fetchPostOver = notice => {
    message.info(notice);
    return {
        type: FETCH_POST_OVER
    };
};
const fetchPostById = (idUser, page, page_size, history) => {
    return {
        type: FETCH_POSTS_BY_ID,
        payload: {
            idUser,
            page,
            page_size,
            history
        }
    }
}
const fetchPostByIdSuccess = (data) => {
    return {
        type: FETCH_POSTS_BY_ID_SUCCESS,
        payload: data
    }
}
const fetchPostByIdOver = notice => {
    message.info(notice);
    return {
        type: FETCH_POSTS_BY_ID_OVER
    };
};

export default {
    createPost,
    createPostSuccess,
    createPostError,
    setMentions,
    fetchPost,
    fetchPostSuccess,
    fetchPostOver,
    fetchPostById,
    fetchPostByIdSuccess,
    fetchPostByIdOver
};
