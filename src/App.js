import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import LocaleWrapper from './views/.umi/LocaleWrapper';
import Routes from './routes/Router';
import { getToken, checkToken, setAuthToken } from './config';
import './App.css';

const browserHistory = createBrowserHistory();

if (checkToken()) {
    const tokenString = getToken();
    const token = JSON.parse(tokenString);
    const accessToken = token.accessToken;
    setAuthToken(accessToken);
}

export default function App() {
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
