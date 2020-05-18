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
    FETCH_POSTS_BY_ID_OVER,
    SET_POST,
    SET_URL_IMAGE,
    FETCH_POST_ERROR,
    FETCH_POSTS_BY_ID_ERROR,
    UNMOUNT_POST_BY_ID,
    LIKE_POST,
    LIKE_POST_SUCCESS,
    LIKE_POST_ERROR,
    DISLIKE_POST,
    DISLIKE_POST_SUCCESS,
    DISLIKE_POST_ERROR,
} from './../constants/types';

const createPost = (posts, mentions, idUser, urlImages) => {
    return {
        type: CREATE_POST,
        payload: {
            posts,
            mentions,
            idUser,
            urlImages
        }
    };
};
const createPostSuccess = (notice) => {
    message.success(notice);
    return {
        type: CREATE_POST_SUCCESS,
    };
};
const createPostError = error => {
    message.error(error);
    return {
        type: CREATE_POST_ERROR
    };
};
const setPost = post => {
    return {
        type: SET_POST,
        payload: post
    }
}
const setUrlImages = urlImages => {
    return {
        type: SET_URL_IMAGE,
        payload: urlImages
    }
}
const setMentions = mentions => {
    return {
        type: SET_MENTIONS,
        payload: mentions
    };
};
const fetchPost = (page, page_size) => {
    return {
        type: FETCH_POST,
        payload: {
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
const fetchPostError = notice => {
    message.error(notice, 4)
    return {
        type: FETCH_POST_ERROR
    }
}
const fetchPostOver = notice => {
    message.info(notice);
    return {
        type: FETCH_POST_OVER
    };
};
const fetchPostById = (idUser, page, page_size) => {
    return {
        type: FETCH_POSTS_BY_ID,
        payload: {
            idUser,
            page,
            page_size
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
const fetchPostByIdError = notice => {
    message.error(notice, 4);
    return {
        type: FETCH_POSTS_BY_ID_ERROR
    }
};
const unmountPostById = () => {
    return {
        type: UNMOUNT_POST_BY_ID
    }
}
const likePost = (idUser, idPost) => {
    return {
        type: LIKE_POST,
        payload: {idUser, idPost}
    }
}
const likePostSuccess = data => {
    return {
        type: LIKE_POST_SUCCESS,
        payload: data
    }
}
const likePostError = error => {
    message.error(error, 4);
    return {
        type: LIKE_POST_ERROR
    }
}
const dislikePost = (idUser, idPost) => {
    return {
        type: DISLIKE_POST,
        payload: {idUser, idPost}
    }
}
const dislikePostSuccess = data => {
    return {
        type: DISLIKE_POST_SUCCESS,
        payload: data
    }
}
const dislikePostError = error => {
    message.error(error, 4);
    return {
        type: DISLIKE_POST_ERROR
    }
}

export default {
    createPost,
    createPostSuccess,
    createPostError,
    setMentions,
    fetchPost,
    fetchPostSuccess,
    fetchPostError,
    fetchPostOver,
    fetchPostById,
    fetchPostByIdSuccess,
    fetchPostByIdError,
    fetchPostByIdOver,
    setPost,
    setUrlImages,
    unmountPostById,
    likePost, 
    likePostSuccess,
    likePostError,
    dislikePost,
    dislikePostSuccess,
    dislikePostError
};
