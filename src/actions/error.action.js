import { notification } from 'antd';
import { INTERNAL_SERVER_ERROR } from '../constants/types';

const serverError = data => {
    notification['error']({
        message: data,
        duration: 4.5
    });
    return {
        type: INTERNAL_SERVER_ERROR,
    };
};

export default {
    serverError
};
