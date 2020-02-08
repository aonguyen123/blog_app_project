import { callAPI } from './index';
import {
    getToken,
    checkExpiredToken,
    setAuthToken,
    setToken,
    removeToken
} from './../config';

export async function getAccessToken(history) {
    try {
        const tokenString = getToken();
        const token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        if (checkExpiredToken(refreshToken)) {
            if (!checkExpiredToken(accessToken)) {
                const newToken = await callAPI('/auth/refreshToken', 'POST', {
                    refreshToken
                });
                setAuthToken(newToken.data.accessToken);
                setToken(newToken.data);
            }
            return true;
        } else {
            removeToken();
            history.push('/login');
            return false;
        }
    } catch (e) {
        //removeToken();
        history.push('/login');
        return false;
    }
}
