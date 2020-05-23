import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRouter(props) {
    const { component: Component, layout: Layout, isAuth, ...rest } = props;

    return (
        <Route
            {...rest}
            render={matchProps => 
                isAuth ? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
export default PrivateRouter;
