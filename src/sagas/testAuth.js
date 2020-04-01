
// function* signout(error) {
//     yield call(allConfigs.tokenConfigs.removeToken()); // remove the token from localStorage
//     yield put(allActions.authenticatedActions.signout(error)); // notify th store
// }

// function* authorize(credentialsOrToken) {
//     const { response } = yield race({
//         response: call(allServices.authService.authorize, credentialsOrToken),
//         signout: take(SIGN_OUT)
//     });
//     if (response && response.token) {
//         yield call(allConfigs.tokenConfigs.setToken, response.token);
//         yield put(allActions.authenticatedActions.authSuccess, response.token);
//         return response.token;
//     } else {
//         yield call(signout, response ? response.error : 'User signed out');
//         return null;
//     }
// }
// function* signInFlowSage({payload}) {
    
    // let token = yield call(allConfigs.tokenConfigs.getToken()); // retreive from local storage
    // token.expires_in = 0;
    // while(true)
    // {
        // if(!token) {
        //     let {credentials} = yield take(SIGN_IN);
        //     token = yield call(authorize, credentials)
        // }

        //const { credentials } = yield take(SIGN_IN);
        // let token = yield call(authorize, credentials);
        // if(!token)
        // {
        //     //continue; // cho hd request signin
        // }
        // let userSignedOut
        // while(!userSignedOut)
        // {
        //     const { expired } = yield race({
        //         // expired: wait(token.expires_in),
        //         signout: take(SIGN_OUT)
        //     });
        //     //token expired first
        //     if(expired)
        //     {
        //         token = yield call(authorize, token);
        //         if(!token)
        //         {
        //             userSignedOut = true;
        //             yield call(signout, 'Token expired');
        //         }
        //     }
        //     // user signed out before token expiration
        //     else
        //     {
        //         userSignedOut = true;
        //         yield call(signout, 'User signed out');
        //     }
        // }
    // }
// }