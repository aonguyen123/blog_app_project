import allCommons from './../common';

const createPost = (posts, mentions, idUser, urlImages) => {
    return allCommons.callAPICommon.callAPI('/posts/create-posts', 'POST', {
        posts,
        mentions,
        idUser,
        urlImages
    });
};
const fetchPost = (page, page_size) => {
    return allCommons.callAPICommon.callAPI(
        `/posts/fetch-posts/page=${page}&page_size=${page_size}`,
        'GET',
        null
    );
};
const fetchPostById = (idUser, page, page_size) => {
    return allCommons.callAPICommon.callAPI(
        `/posts/fetch-post-by-id/${idUser}/page=${page}&page_size=${page_size}`,
        'GET',
        null
    );
};
const likePost = (idUser, idPost) => {
    return allCommons.callAPICommon.callAPI('/posts/likePost', 'POST', {idUser, idPost});
}
const dislikePost = (idUser, idPost) => {
    return allCommons.callAPICommon.callAPI('/posts/dislikePost', 'POST', {idUser, idPost});
}

export default {
    createPost,
    fetchPost,
    fetchPostById,
    likePost,
    dislikePost
};
