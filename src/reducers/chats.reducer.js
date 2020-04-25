import {
    GET_CHATS_SUCCESS,
    GET_STATUS_CHATS_SUCCESS,
    GET_STATUS_AFTER,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_AFTER,
    CHANGE_VISIBLE_CREATE_ROOM,
    GET_CHAT_AFTER,
    CHECK_JOIN_ROOM_SUCCESS,
    CHECK_JOIN_ROOM,
    GET_USER_CURRENT_ONL,
    GET_MESSAGE_ROOM_AFTER
} from '../constants/types';

const initialState = {
    chats: [],
    status: [],
    rooms: [],
    roomInfo: {},
    userRoom: [],
    messageInRoom: [],
    checkJoin: {},
    visible: false,
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
        case GET_STATUS_CHATS_SUCCESS:
            return {
                ...state,
                status: action.payload
            };
        case GET_STATUS_AFTER:
            return {
                ...state,
                status: [...state.status, action.payload]
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.payload
            };
        case GET_ROOMS_AFTER:
            return {
                ...state,
                rooms: [...state.rooms, action.payload],
                visible: false
            };
        case CHANGE_VISIBLE_CREATE_ROOM:
            return {
                ...state,
                visible: action.payload
            };
        case CHECK_JOIN_ROOM:
            return {
                ...state,
                checkJoin: action.payload
            }
        case CHECK_JOIN_ROOM_SUCCESS:
            return {
                ...state,
                roomInfo: action.payload.room,
                userRoom: action.payload.userRoom,
                messageInRoom: action.payload.messageRoom
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