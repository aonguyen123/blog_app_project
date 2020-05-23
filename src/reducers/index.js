import { combineReducers } from 'redux';
import authReducer from './authenticated.reducer';
import geocodeReducer from './geocode.reducer';
import uiReducer from './ui.reducer';
import userReducer from './user.reducer';
import postReducer from './post.reducer';
import chatsReducer from './chats.reducer';
import commentReducer from './comment.reducer';
import errorReducer from './error.reducer';

export default combineReducers({
    auth: authReducer,
    geocodeReducer,
    uiReducer,
    userReducer,
    postReducer,
    chatsReducer,
    commentReducer,
    errorReducer
});