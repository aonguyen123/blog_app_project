import {
    GET_CHATS_SUCCESS,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_AFTER,
    GET_CHAT_AFTER,
    CHECK_JOIN_ROOM_SUCCESS,
    GET_USER_CURRENT_ONL,
    GET_MESSAGE_ROOM_AFTER,
    LEAVE_ROOM,
    DELETE_ROOM
} from '../constants/types';

const initialState = {
    chats: [],
    rooms: [],
    roomInfo: {},
    userRoom: [],
    messageInRoom: [],
};
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                chats: action.payload
            };
        case GET_CHAT_AFTER:
            return {
                ...state,
                chats: [...state.chats, action.payload]
            }
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.payload
            };
        case GET_ROOMS_AFTER:
            return {
                ...state,
                rooms: [...state.rooms, action.payload],
            };
        case CHECK_JOIN_ROOM_SUCCESS:
            return {
                ...state,
                roomInfo: action.payload.room,
                userRoom: action.payload.userRoom,
                messageInRoom: action.payload.messageRoom,
            }
        case GET_USER_CURRENT_ONL:
            const users = filterUserOnl(state.userRoom, action.payload);
            return {
                ...state,
                userRoom: [...users]
            }
        case GET_MESSAGE_ROOM_AFTER:
            return {
                ...state,
                messageInRoom: [...state.messageInRoom, action.payload]
            }
        case LEAVE_ROOM:
            const userRest = leaveRoom(state.userRoom, action.payload);
            return {
                ...state,
                userRoom: [...userRest]
            }
        case DELETE_ROOM:
            const rooms = deleteRoom(state.rooms, action.payload);
            return {
                ...state,
                rooms: [...rooms]
            }
        default:
            return state;
    }
}

function filterUserOnl(users, userOnl) {
    const index = users.findIndex(user => user.idUser._id === userOnl.idUser._id);
    if(index !== -1) {
        users.splice(index, 1);   
    }
    users.push(userOnl);
    return users;
}
function leaveRoom(users, userLeave) {
    const index = users.findIndex(user => user.idUser._id === userLeave.idUser._id);
    if(index !== -1) {
        users.splice(index, 1);
    }
    return users;
}
function deleteRoom(rooms, roomDelete) {
    const index = rooms.findIndex(room => room._id === roomDelete._id);
    if(index !== -1) {
        rooms.splice(index, 1);
    }
    return rooms;
}