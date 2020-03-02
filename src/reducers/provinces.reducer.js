import { GET_PROVINCES, GET_DISTRICT, FETCHING_DISTRICT, FETCHING_DISTRICT_SUCCESS } from './../constants/types';

const initialState = {
    provinces: [],
    districts: [],
    loadingProvince: false
}

export default function (state = initialState, action) {
    switch(action.type)
    {
        case GET_PROVINCES:
            return {
                ...state,
                provinces: action.payload
            }
        case GET_DISTRICT: 
            return {
                ...state,
                districts: action.payload
            }
        case FETCHING_DISTRICT:
            return {
                ...state,
                loadingProvince: true
            }
        case FETCHING_DISTRICT_SUCCESS:
            return {
                ...state,
                loadingProvince: false
            }
        default:
            return state;
    }
}