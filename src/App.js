import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import LocaleWrapper from './views/.umi/LocaleWrapper';
import Routes from './routes/Router';
import allConfigs from './config';
import allActions from './actions';
import './App.css';

const browserHistory = createBrowserHistory();

export default function App() {    
    useEffect(() => {
        if (!allConfigs.tokenConfigs.checkToken()) {
            store.dispatch(allActions.authenticatedActions.authenticatedFail());
        } else {
            const { accessToken } = allConfigs.tokenConfigs.getToken();
            allConfigs.setAuthTokenConfigs.setAuthToken(accessToken);
            store.dispatch(
                allActions.authenticatedActions.authenticated(accessToken)
            );
        }
    });

    return (
        <Provider store={store}>
            <LocaleWrapper>
                <Router history={browserHistory}>
                    <Routes />
                </Router>
            </LocaleWrapper>
        </Provider>
    );
}
