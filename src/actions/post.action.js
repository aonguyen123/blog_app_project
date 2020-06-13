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
    FETCH_POST_ERROR,
    FETCH_POSTS_BY_ID_ERROR,
    UNMOUNT_POST_BY_ID,
    LIKE_POST,
    LIKE_POST_SUCCESS,
    LIKE_POST_ERROR,
    DISLIKE_POST,
    DISLIKE_POST_SUCCESS,
    DISLIKE_POST_ERROR,
    LOAD_MORE_POST,
    LOAD_MORE_POST_BY_ID,
    DELETE_POST_BY_ID,
    DELETE_POST_BY_ID_SUCCESS,
    DELETE_POST_BY_ID_ERROR,
    FETCH_POST_BY_ID_POST,
    FETCH_POST_BY_ID_POST_SUCCESS,
    FETCH_POST_BY_ID_POST_ERROR,
    CLEAR_POST_BY_ID_POST,
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
        type: CREATE_POST_SUCCESS
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
const fetchPost = (page, page_size, idUser) => {
    return {
        type: FETCH_POST,
        payload: {
            page,
            page_size,
            idUser
        }
    };
};
const loadMorePost = (page, page_size, idUser) => {
    return {
        type: LOAD_MORE_POST,
        payload: {
            page,
            page_size,
            idUser
        }
    }
}
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
const fetchPostOver = data => {
    return {
        type: FETCH_POST_OVER,
        payload: data
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
const loadMorePostById = (idUser, page, page_size) => {
    return {
        type: LOAD_MORE_POST_BY_ID,
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
const fetchPostByIdOver = data => {
    return {
        type: FETCH_POSTS_BY_ID_OVER,
        payload: data
    };
};
const fetchPostByIdError = error => {
    return {
        type: FETCH_POSTS_BY_ID_ERROR,
        payload: error
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
const deletePostById = idPost => {
    return {
        type: DELETE_POST_BY_ID,
        payload: {idPost}
    }
}
const deletePostByIdSuccess = data => {
    return {
        type: DELETE_POST_BY_ID_SUCCESS,
        payload: data
    }
}
const deletePostByIdError = error => {
    message.error(error, 4);
    return {
        type: DELETE_POST_BY_ID_ERROR
    }
}
const fetchPostByIdPost = idPost => {
    return {
        type: FETCH_POST_BY_ID_POST,
        payload: {idPost}
    }
}
const fetchPostByIdPostSuccess = data => {
    return {
        type: FETCH_POST_BY_ID_POST_SUCCESS,
        payload: data
    }
}
const fetchPostByIdPostError = error => {
    message.error(error, 4);
    return {
        type: FETCH_POST_BY_ID_POST_ERROR
    }
}
const clearPostByIdPost = () => {
    return {
        type: CLEAR_POST_BY_ID_POST
    }
}

export default {
    createPost,
    createPostSuccess,
    createPostError,
    setMentions,
    fetchPost,
    loadMorePost,
    fetchPostSuccess,
    fetchPostError,
    fetchPostOver,
    fetchPostById,
    loadMorePostById,
    fetchPostByIdSuccess,
    fetchPostByIdError,
    fetchPostByIdOver,
    unmountPostById,
    likePost, 
    likePostSuccess,
    likePostError,
    dislikePost,
    dislikePostSuccess,
    dislikePostError,
    deletePostById, 
    deletePostByIdSuccess,
    deletePostByIdError,
    fetchPostByIdPost,
    fetchPostByIdPostSuccess,
    fetchPostByIdPostError,
    clearPostByIdPost
};
