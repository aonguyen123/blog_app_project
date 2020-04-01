import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import LocaleWrapper from './views/.umi/LocaleWrapper';
import Routes from './routes/Router';
import allConfigs from './config';
import { ScrollToTop } from './components';
import './App.css';

const browserHistory = createBrowserHistory();

if (allConfigs.tokenConfigs.checkToken()) {
    const token = allConfigs.tokenConfigs.getToken().accessToken;
    allConfigs.setAuthTokenConfigs.setAuthToken(token);
}

export default function App() {
    return (
        <Provider store={store}>
            <LocaleWrapper>
                <Router history={browserHistory}>
                    <ScrollToTop />
                    <Routes />
                </Router>
            </LocaleWrapper>
        </Provider>
    );
}
