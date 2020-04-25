import { message } from 'antd';
import {
    GET_CHATS,
    GET_CHATS_SUCCESS, 
    GET_CHATS_ERROR,
    GET_STATUS_CHATS,
    GET_STATUS_CHATS_SUCCESS,
    GET_STATUS_CHATS_ERROR,
    GET_STATUS_AFTER,
    GET_ROOMS,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_ERROR,
    GET_ROOMS_AFTER,
    CHANGE_VISIBLE_CREATE_ROOM,
    GET_CHAT_AFTER,
    CHECK_JOIN_ROOM,
    CHECK_JOIN_ROOM_SUCCESS,
    CHECK_JOIN_ROOM_ERROR,
    GET_USER_CURRENT_ONL,
    GET_MESSAGE_ROOM_AFTER
} from '../constants/types';

const getChats = () => {
    return {
        type: GET_CHATS
    };
};
const getChatsSuccess = data => {
    return {
        type: GET_CHATS_SUCCESS,
        payload: data
    }
}
const getChatsError = error => {
    message.error(error, 4);
    return {
        type: GET_CHATS_ERROR
    }
}
const getChatAfter = chat => {
    return {
        type: GET_CHAT_AFTER,
        payload: chat
    }
}
const getStatusChats = () => {
    return {
        type: GET_STATUS_CHATS
    };
};
const getStatusChatsSuccess = data => {
    return {
        type: GET_STATUS_CHATS_SUCCESS,
        payload: data
    };
};
const getStatusChatsError = notice => {
    message.error(notice, 4);
    return {
        type: GET_STATUS_CHATS_ERROR
    }
}
const getStatusAfter = status => {
    return {
        type: GET_STATUS_AFTER,
        payload: status
    }
}
const getRooms = () => {
    return {
        type: GET_ROOMS
    }
}
const getRoomsSuccess = data => {
    return {
        type: GET_ROOMS_SUCCESS,
        payload: data
    }
}
const getRoomsError = error => {
    message.error(error, 4);
    return {
        type: GET_ROOMS_ERROR,
    }
}
const getRoomAfter = room => {
    return {
        type: GET_ROOMS_AFTER,
        payload: room
    }
}
const changeVisibleCreateRoom = data => {
    return {
        type: CHANGE_VISIBLE_CREATE_ROOM,
        payload: data
    }
}
const checkJoinRoom = (idRoom, idUser, history) => {
    return {
        type: CHECK_JOIN_ROOM,
        payload: { idRoom, idUser, history }
    }
}
const checkJoinRoomSuccess = data => {
    return {
        type: CHECK_JOIN_ROOM_SUCCESS,
        payload: data
    }
}
const checkJoinRoomError = error => {
    message.error(error, 4);
    return {
        type: CHECK_JOIN_ROOM_ERROR
    }
}
const getUserCurOnl = data => {
    return {
        type: GET_USER_CURRENT_ONL,
        payload: data
    }
}
const getMessageRoomAfter = message => {
    return {
        type: GET_MESSAGE_ROOM_AFTER,
        payload: message
    }
}

export default {
    getChats,
    getChatsSuccess,
    getChatsError,
    getChatAfter,
    getStatusChats, 
    getStatusChatsSuccess,
    getStatusChatsError,
    getStatusAfter,
    getRooms,
    getRoomsSuccess,
    getRoomsError,
    getRoomAfter,
    changeVisibleCreateRoom,
    checkJoinRoom, 
    checkJoinRoomSuccess,
    checkJoinRoomError,
    getUserCurOnl,
    getMessageRoomAfter
};
