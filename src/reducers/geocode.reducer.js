import {
    GET_PROVINCES_SUCCESS,
    GET_DISTRICTS_SUCCESS,
    GET_PROVINCES,
    GET_DISTRICTS,
    GET_WEATHER_SUCCESS
} from './../constants/types';

const initialState = {
    weather: {},
    currentPlace: '',
    provinces: [],
    districts: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                weather: action.payload.weather,
                currentPlace: action.payload.currentPlace
            }
        case GET_PROVINCES:
            return {
                ...state
            }
        case GET_DISTRICTS:
            return {
                ...state
            }
        case GET_DISTRICTS_SUCCESS:
            return {
                ...state,
                districts: action.payload
            };
        case GET_PROVINCES_SUCCESS:
            return {
                ...state,
                provinces: action.payload
            };
        default:
            return state;
    }
}
