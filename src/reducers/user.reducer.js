import {
    SEARCH_USER_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USER,
    SEARCH_USER,
    SIGN_OUT_SUCCESS,
    GET_USERS_ONLINE
} from './../constants/types';

const initialState = {
    userFetch: {},
    userSearch: {},
    searchResult: [],
    userInfo: {},
    usersOnline: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                searchResult: action.payload
            };
        case SEARCH_USER:
            return {
                ...state,
                userSearch: action.payload,
                searchResult: []
            };
        case FETCH_USER:
            return {
                ...state,
                userFetch: action.payload
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                userInfo: {}
            }
        case GET_USERS_ONLINE:
            const users = filterUsers(action.payload);
            return {
                ...state,
                usersOnline: users
            }
        default:
            return state;
    }
}

function filterUsers(users) {
    for(let i=0; i<users.length; i++) {
        for(let j=i+1; j<users.length; j++) {
            if(users[i]._id === users[j]._id) {
                users.splice(j, 1);
            }
        }
    }  
    return users;
}