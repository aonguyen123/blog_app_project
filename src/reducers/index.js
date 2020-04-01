import { combineReducers } from 'redux';
import authReducer from './authenticated.reducer';
import errorsReducer from './errors.reducer';
import geocodeReducer from './geocode.reducer';
import uiReducer from './ui.reducer';
import userReducer from './user.reducer';
import postReducer from './post.reducer';

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    geocodeReducer,
    uiReducer,
    userReducer,
    postReducer
});