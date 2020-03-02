import {
    GET_CURRENT_PLACE,
    GET_ERRORS_PLACE,
    CLEAN_ERRORS_PLACE,
    GET_ERRORS,
    GET_PROVINCES,
    GET_DISTRICT,
    FETCHING_DISTRICT,
    FETCHING_DISTRICT_SUCCESS
} from './../constants/types';
import { callAPI, getAccessToken } from './../common';
import axios from 'axios';

const getCurrentPlace = (lat, lon, history) => async dispatch => {
    const result = await getAccessToken(history);
    if (result) {
        callAPI(`/weather/get-geocode?latitude=${lat}&longitude=${lon}`)
            .then(res => {
                dispatch({
                    type: GET_CURRENT_PLACE,
                    payload: res.data
                });
                dispatch({
                    type: CLEAN_ERRORS_PLACE,
                    payload: {}
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS_PLACE,
                    payload: err.response.data
                });
            });
    }
};
const getProvinces = () => async dispatch => {
    axios
        .get('https://dc.tintoc.net/app/api-customer/public/provinces?size=65')
        .then(res => {
            dispatch({
                type: GET_PROVINCES,
                payload: res.data
            });
        });
};
const getDistricts = (province) => dispatch => {
    dispatch({
        type: FETCHING_DISTRICT
    });
    axios.get(`https://dc.tintoc.net/app/api-customer/public/districts?provinceId.equals=${province}`)
    .then(res => {
        dispatch({
            type: GET_DISTRICT,
            payload: res.data
        });
        dispatch({
            type: FETCHING_DISTRICT_SUCCESS,
        });
    })
}

export default {
    getCurrentPlace,
    getProvinces,
    getDistricts
};
