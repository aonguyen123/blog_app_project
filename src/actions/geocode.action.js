import {
    GET_WEATHER,
    GET_DISTRICTS,
    GET_DISTRICTS_ERROR,
    GET_DISTRICTS_SUCCESS,
    GET_PROVINCES,
    GET_PROVINCES_ERROR,
    GET_PROVINCES_SUCCESS,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_ERROR
} from './../constants/types';
import { message } from 'antd';

const getWeather = (lat, lon, history) => {
    return {
        type: GET_WEATHER,
        payload: {
            lat,
            lon     
        }
    };
};
const getWeatherSuccess = data => {
    return {
        type: GET_WEATHER_SUCCESS,
        payload: data
    };
};
const getWeatherError = notice => {
    message.error(notice, 4);
    return {
        type: GET_WEATHER_ERROR
    };
};
const getProvinces = () => {
    return {
        type: GET_PROVINCES
    };
};
const getProvincesSuccess = data => {
    return {
        type: GET_PROVINCES_SUCCESS,
        payload: data
    };
};
const getProvincesError = error => {
    message.error(error);
    return {
        type: GET_PROVINCES_ERROR
    };
};
const getDistricts = provinceId => {
    return {
        type: GET_DISTRICTS,
        payload: provinceId
    };
};
const getDistrictsSuccess = data => {
    return {
        type: GET_DISTRICTS_SUCCESS,
        payload: data
    };
};
const getDistrictsError = error => {
    message.error(error);
    return {
        type: GET_DISTRICTS_ERROR
    };
};

export default {
    getWeather,
    getWeatherSuccess,
    getWeatherError,
    getProvinces,
    getProvincesSuccess,
    getProvincesError,
    getDistricts,
    getDistrictsSuccess,
    getDistrictsError
};
