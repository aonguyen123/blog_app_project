import allCommons from './../common';

const addComment = (idPost, idUser, content) => {
    return allCommons.callAPICommon.callAPI('/comments/addComment', 'POST', {idPost, idUser, content});
}
const fetchCommentByIdPost = idPost => {
    return allCommons.callAPICommon.callAPI(`/comments/fetchCommentByIdPost/${idPost}`, 'GET', null);
}

export default {
    addComment,
    fetchCommentByIdPost
}