import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { Provider } from 'react-redux';
import store from './../../../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './../../../config/setAuthToken';
import { logoutUserSysTem, setCurrentUser } from './../../../actions/authentication';
import './app.css';

if(localStorage.jwtToken)
{
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded)); 
    
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime)
    {
        store.dispatch(logoutUserSysTem());
        window.location.href = '/signin';
    }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>{this.showRouter(routes)}</Switch>
                </Router>
            </Provider>
        );
    }
    showRouter = routes => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((router, key) => {
                return (
                    <Route
                        key={key}
                        path={router.path}
                        exact={router.exact}
                        component={router.main}
                    />
                );
            });
        }
        return result;
    };
}

export default App;
