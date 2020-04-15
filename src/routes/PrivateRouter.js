import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import allConfigs from '../config';

function PrivateRouter(props) {
    const { component: Component, layout: Layout, isAuth, ...rest } = props;

    return (
        <Route
            {...rest}
            render={matchProps => {
                if (matchProps.match.path === '/home') {
                    allConfigs.menuConfigs.setSelectedMenu();
                }
                return isAuth ? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
}
export default PrivateRouter;
