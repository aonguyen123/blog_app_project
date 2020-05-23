import {
    SEARCH_USER_SUCCESS,
    FETCH_USER_SUCCESS,
    SEARCH_USER,
    SIGN_OUT_SUCCESS,
    FETCH_USER_BY_ID_SUCCESS,
    UPDATE_PHOTOURL_USER_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_INTEREST_SUCCESS,
    REMOVE_INTEREST_SUCCESS
} from './../constants/types';

const initialState = {
    searchResult: [],
    userInfo: {},
    userById: {},
    visibleModal: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                searchResult: action.payload
            };
        case SEARCH_USER:
            return {
                ...state,
                searchResult: []
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                userInfo: {}
            }
        case FETCH_USER_BY_ID_SUCCESS:
            return {
                ...state,
                userById: action.payload
            }
        case UPDATE_PHOTOURL_USER_SUCCESS:
            const userInfo = updatePhotoURL(state.userInfo, action.payload);
            return {
                ...state,
                userInfo: {...userInfo}
            }
        case UPDATE_PROFILE_SUCCESS:
            const userInfoUpdate = updateProfile(state.userInfo, action.payload);
            return {
                ...state,
                userInfo: {...userInfoUpdate}
            }
        case UPDATE_INTEREST_SUCCESS:
            const updated = createInterest(state.userInfo, action.payload);
            return {
                ...state,
                userInfo: {...updated}
            }
        case REMOVE_INTEREST_SUCCESS:
            const removed = removeInterest(state.userInfo, action.payload);
            return {
                ...state,
                userInfo: removed
            }
        default:
            return state;
    }
}

function updatePhotoURL(userInfo, photoURL) {
    userInfo.photoURL = photoURL;
    return userInfo;
}
function updateProfile(userInfo, userUpdated) {
    userInfo.email = userUpdated.email;
    userInfo.displayName = userUpdated.nickname;
    userInfo.description = userUpdated.profile;
    userInfo.phonenumber = userUpdated.phone;
    userInfo.provinceOrCity = userUpdated.address.province;
    userInfo.district = userUpdated.address.district;
    return userInfo;
}
function createInterest(userInfo, interest) {
    userInfo.interests.push(interest);
    return userInfo;
}
function removeInterest(userInfo, interest) {
    const index = userInfo.interests.findIndex(i => i.label === interest.label);
    if(index !== -1) {
        userInfo.interests.splice(index, 1);
    }    
    return userInfo;
}