import axios from 'axios';
import allCommons from './../common';

const getProvinces = () => {
    return axios.get(
        'https://dc.tintoc.net/app/api-customer/public/provinces?size=65'
    );
};
const getDistricts = provinceId => {
    return axios.get(
        `https://dc.tintoc.net/app/api-customer/public/districts?provinceId.equals=${provinceId}`
    );
};
const getCurrentPlace = (lat, lon) => {
    return allCommons.callAPICommon.callAPI(
        `/weather/get-geocode?latitude=${lat}&longitude=${lon}`,
        'GET',
        null
    );
};

export default {
    getProvinces,
    getDistricts,
    getCurrentPlace
};
