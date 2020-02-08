import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkMe } from './../common';

function PrivateRouter(props) {
    const { component: Component, layout: Layout, ...rest } = props;
    return (
        <Route
            {...rest}
            render={matchProps => (
                checkMe() ? <Layout><Component {...matchProps} /></Layout> : <Redirect to="/login" />
            )}
        />
    );
}
export default PrivateRouter;