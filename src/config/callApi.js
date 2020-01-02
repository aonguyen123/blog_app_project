import axios from 'axios';

const URL = 'http://localhost:4000';
export default function callAPI(header ,endPoint, method = 'GET', body) {
    return axios({
        header,
        method,
        url: `${URL}/${endPoint}`,
        data: body
    })
}
