import jwt from 'jsonwebtoken';

export function setToken(token) {
    if (Object.keys(token).length !== 0) {
        return localStorage.setItem('_id-access', JSON.stringify(token));
    }
};
export function getToken() {
    const token = localStorage.getItem('_id-access');
    return token;
};
export function removeToken() {
    return localStorage.removeItem('_id-access');
};
export function checkToken() {
    const id_access = localStorage.getItem('_id-access');
    if (!id_access) {
        return false;
    }
    return true;
};
export function checkExpiredToken(token) {
    const decode = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
        return false;
    }
    return true;
};
