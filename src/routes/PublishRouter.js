import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PublishRouter(props) {
    const {
        component: Component,
        layout: Layout,
        restricted,
        isAuth,
        ...rest
    } = props;
    return (
        <Route
            {...rest}
            render={matchProps =>
                isAuth && restricted ? (
                    <Redirect to="/" />
                ) : (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                )
            }
        />
    );
}
export default PublishRouter;
