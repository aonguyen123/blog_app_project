import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkMe } from './../common';

function PublishRouter(props) {
    const { component: Component, layout: Layout, restricted, ...rest } = props;
    return (
        <Route
            {...rest}
            render={matchProps => (
                checkMe() && restricted ? <Redirect to='/' /> : <Layout><Component {...matchProps} /></Layout>
            )}
        />
    );
}
export default PublishRouter;