import allCommons from './../common';

const login = (email, password) => {
    return allCommons.callAPICommon.callAPI('/auth/login', 'POST', {
        email,
        password
    });
};
const refreshToken = (refreshToken) => {
    return allCommons.callAPICommon.callAPI('/auth/refreshToken', 'POST', {
        refreshToken
    });
};
const register = values => {
    return allCommons.callAPICommon.callAPI('/auth/register', 'POST', {values});
}

export default {
    login,
    refreshToken,
    register,
};
