import { combineReducers } from 'redux';
import errorReduces from './errorReducer';
import authReducer from './authReducer';
import getUser from './getUser';

export default combineReducers({
    errors: errorReduces,
    auth: authReducer,
    currentUser: getUser
});