import jwt from 'jsonwebtoken';

const setToken = ({accessToken, refreshToken}) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};
const getToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const token = {
        accessToken,
        refreshToken
    }
    return token;
};
const removeToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

const checkToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
        return false;
    }
    return true;
};

const checkExpiredToken = token => {
    const decode = jwt.decode(token);
    if(decode)
    {
        const currentTime = Date.now() / 1000;
        if (decode.exp < currentTime) {
            return false;
        }
        return true;
    }
    return null;
};

const getIdUser = () => {
    return localStorage.getItem('_id');
};
const setIdUser = id => {
    return localStorage.setItem('_id', id);
}

export default {
    setToken,
    getToken,
    removeToken,
    checkToken,
    checkExpiredToken,
    getIdUser,
    setIdUser
};
