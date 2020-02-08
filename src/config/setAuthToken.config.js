import axios from 'axios';

export function setAuthToken(token) {
    if(token)
    {
        axios.defaults.headers.common['x-access-token'] = token;
    }
    else
    {
        delete axios.defaults.headers.common['x-access-token'];
    }
};