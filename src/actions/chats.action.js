import { message } from 'antd';
import {
    GET_CHATS,
    GET_CHATS_SUCCESS, 
    GET_CHATS_ERROR,
    GET_STATUS_CHATS,
    GET_ROOMS,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_ERROR,
    GET_ROOMS_AFTER,
    GET_CHAT_AFTER,
    CHECK_JOIN_ROOM,
    CHECK_JOIN_ROOM_SUCCESS,
    CHECK_JOIN_ROOM_ERROR,
    GET_USER_CURRENT_ONL,
    GET_MESSAGE_ROOM_AFTER,
    LEAVE_ROOM,
    DELETE_ROOM
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
const getStatusChat = text => {
    message.info(text, 4);
    return {
        type: GET_STATUS_CHATS,
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
const leaveRoom = data => {
    return {
        type: LEAVE_ROOM,
        payload: data
    }
}
const deleteRoom = data => {
    return {
        type: DELETE_ROOM,
        payload: data
    }
}

export default {
    getChats,
    getChatsSuccess,
    getChatsError,
    getChatAfter,
    getStatusChat,
    getRooms,
    getRoomsSuccess,
    getRoomsError,
    getRoomAfter,
    checkJoinRoom, 
    checkJoinRoomSuccess,
    checkJoinRoomError,
    getUserCurOnl,
    getMessageRoomAfter,
    leaveRoom,
    deleteRoom
};
