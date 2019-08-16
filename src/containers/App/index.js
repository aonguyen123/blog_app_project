import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import routes from './../../routes/routes';
import theme from './../../commons/theme/index';

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        {this.showRouter(routes)}
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
    showRouter = (routes) => {
        let result = null;
        if(routes.length > 0)
        {
            result = routes.map((router, key) => {
                return (
                    <Route
                        key={key}
                        path={router.path}
                        exact={router.exact}
                        component={router.main}
                    />
                )
            });
        }
        return result;
    }
}

export default withStyles(styles)(App);
