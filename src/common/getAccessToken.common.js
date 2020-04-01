import jwt from 'jsonwebtoken';
import allCommons from './index';
import allConfigs from '../config';

async function getAccessToken() {
    try {
        const tokenString = allConfigs.tokenConfigs.getToken();
        const token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        const decode = jwt.decode(accessToken);
        if (decode === null || undefined) {
            return false;
        }
        if (allConfigs.tokenConfigs.checkExpiredToken(refreshToken)) {
            if (!allConfigs.tokenConfigs.checkExpiredToken(accessToken)) {
                const newToken = await allCommons.callAPICommon.callAPI('/auth/refreshToken', 'POST', {
                    refreshToken
                });
                allConfigs.setAuthTokenConfigs.setAuthToken(
                    newToken.data.accessToken
                );
                allConfigs.tokenConfigs.setToken(newToken.data);
            }
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export default {
    getAccessToken
}