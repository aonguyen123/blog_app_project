import allCommons from './../common';

const searchUser = q => {
    return allCommons.callAPICommon.callAPI(`/user/search-user?q=${q}`);
}
const fetchUser = idUser => {
    return allCommons.callAPICommon.callAPI(`/user/fetch-user/${idUser}`);
}

export default {
    searchUser,
    fetchUser
}