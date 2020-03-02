import { combineReducers } from 'redux';
import authReducer from './authenticated.reducer';
import errorsReducer from './errors.reducer';
import geocodeReducer from './geocode.reducer';
import provincesReducer from './provinces.reducer';

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    currentPlace: geocodeReducer,
    provincesReducer
});