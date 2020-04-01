import allConfigs from './../config';
import allCommons from './../common';

function checkMe(...rest) {
    const { match, history } = rest[0];
    if(match.url === '/home')
    {
        allConfigs.menuConfigs.setSelectedMenu();
    }

    if (allConfigs.tokenConfigs.checkToken()) {
        const token = allConfigs.tokenConfigs.getToken();
        const { accessToken, refreshToken } = token;
        const expired_accessToken = allConfigs.tokenConfigs.checkExpiredToken(accessToken);
        if(!expired_accessToken)
        {
            allCommons.callAPICommon.callAPI('/auth/refreshToken', 'POST', {refreshToken})
            .then(res => {
                const {accessToken} = res.data;
                allConfigs.tokenConfigs.setToken({accessToken, refreshToken});
                allConfigs.setAuthTokenConfigs.setAuthToken(accessToken);
                return true;
            })
            .catch(e => {
                allConfigs.tokenConfigs.removeToken();
                history.push('/login');
                return false;
            })
        }
        return true;
    }
    return false;
}

export default {
    checkMe
}