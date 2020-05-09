import { message } from 'antd';
import {
    SEARCH_USER,
    SEARCH_USER_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SEARCH_USER_ERROR,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_ID_SUCCESS,
    FETCH_USER_BY_ID_ERROR,
    UPDATE_PHOTOURL_USER,
    UPDATE_PHOTOURL_USER_SUCCESS,
    UPDATE_PHOTOURL_USER_ERROR,
} from './../constants/types';

const searchUser = q => {
    return {
        type: SEARCH_USER,
        payload: { q }
    };
};
const searchUserSuccess = data => {
    return {
        type: SEARCH_USER_SUCCESS,
        payload: data
    };
};
const searchUserError = notice => {
    message.error(notice, 4);
    return {
        type: SEARCH_USER_ERROR
    }
}
const fetchUser = (idUser) => {
    return {
        type: FETCH_USER,
        payload: {
            idUser
        }
    };
};
const fetchUserSuccess = data => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data
    };
};
const fetchUserError = notice => {
    message.error(notice, 4);
    return {
        type: FETCH_USER_ERROR
    }
}
const fetchUserById = idUser => {
    return {
        type: FETCH_USER_BY_ID,
        payload: { idUser }
    }
}
const fetchUserByIdSuccess = data => {
    return {
        type: FETCH_USER_BY_ID_SUCCESS,
        payload: data
    }
}
const fetchUserByIdError = error => {
    message.error(error, 4);
    return {
        type: FETCH_USER_BY_ID_ERROR
    }
}
const updatePhotoURL = (photoURL, idUser) => {
    return {
        type: UPDATE_PHOTOURL_USER,
        payload: { photoURL, idUser }
    }
}
const updatePhotoURLSuccess = photoURL => {
    return {
        type: UPDATE_PHOTOURL_USER_SUCCESS,
        payload: photoURL
    }
}
const updatePhotoURLError = error => {
    message.error(error, 4);
    return {
        type: UPDATE_PHOTOURL_USER_ERROR
    }
}

export default {
    searchUser,
    searchUserSuccess,
    searchUserError,
    fetchUser,
    fetchUserSuccess,
    fetchUserError,
    fetchUserById,
    fetchUserByIdSuccess,
    fetchUserByIdError,
    updatePhotoURL,
    updatePhotoURLSuccess, 
    updatePhotoURLError
};
