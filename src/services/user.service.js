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
const updatePhotoURL = (idUser, photoURL) => {
    return allCommons.callAPICommon.callAPI('/user/updatePhotoURL', 'POST', {idUser, photoURL});
}

export default {
    searchUser,
    fetchUser,
    fetchUserById,
    updatePhotoURL
}