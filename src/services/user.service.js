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
const updateProfile = (data, idUser) => {
    return allCommons.callAPICommon.callAPI('/user/updateProfile', 'POST', {data, idUser});
}
const updatePassword = (newPass, oldPass, idUser) => {
    return allCommons.callAPICommon.callAPI('/user/updatePass', 'POST', {newPass, oldPass, idUser});
}
const updateInterest = (interest, idUser) => {
    return allCommons.callAPICommon.callAPI('/user/updateInterest', 'POST', {interest, idUser});
}
const removeInterest = (interest, idUser) => {
    return allCommons.callAPICommon.callAPI('/user/removeInterest', 'POST', {interest, idUser});
}

export default {
    searchUser,
    fetchUser,
    fetchUserById,
    updatePhotoURL,
    updateProfile,
    updatePassword,
    updateInterest,
    removeInterest
}