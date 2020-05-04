import allCommons from './../common';

const searchUser = q => {
    return allCommons.callAPICommon.callAPI(`/user/search-user?q=${q}`);
}
const fetchUser = idUser => {
    return allCommons.callAPICommon.callAPI(`/user/fetch-user/${idUser}`);
}
const fetchUserById = idUser => {
    return allCommons.callAPICommon.callAPI(`/user/fetch-user-by-id/${idUser}`);
}

export default {
    searchUser,
    fetchUser,
    fetchUserById
}