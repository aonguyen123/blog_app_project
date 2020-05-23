import { message } from 'antd';
import { ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, FETCH_COMMENTS_BY_IDPOST, FETCH_COMMENTS_BY_IDPOST_SUCCESS, FETCH_COMMENTS_BY_IDPOST_ERROR } from "../constants/types"

const addComment = (idPost, idUser, content) => {
    return {
        type: ADD_COMMENT,
        payload: { idPost, idUser, content }
    }
}
const addCommentSuccess = data => {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload: data
    }
}
const addCommentError = error => {
    message.error(error, 4);
    return {
        type: ADD_COMMENT_ERROR
    }
}
const fetchCommentByIdPost = idPost => {
    return {
        type: FETCH_COMMENTS_BY_IDPOST,
        payload: { idPost }
    }
}
const fetchCommentByIdPostSuccess = data => {
    return {
        type: FETCH_COMMENTS_BY_IDPOST_SUCCESS,
        payload: data
    }
}
const fetchCommentByIdPostError = error => {
    return {
        type: FETCH_COMMENTS_BY_IDPOST_ERROR,
        payload: error
    }
}

export default {
    addComment, 
    addCommentSuccess,
    addCommentError,
    fetchCommentByIdPost,
    fetchCommentByIdPostSuccess,
    fetchCommentByIdPostError
}