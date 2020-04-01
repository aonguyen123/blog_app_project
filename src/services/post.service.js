import allCommons from './../common';

const createPost = formData => {
    return allCommons.callAPICommon.callAPI(
        '/posts/create-posts',
        'POST',
        formData
    );
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
        `/posts/fetch-post-by-id/${idUser}/page=${page}&page_size=${page_size}`, 'GET', null
    );
};

export default {
    createPost,
    fetchPost,
    fetchPostById
};
