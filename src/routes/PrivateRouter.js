import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import allCommons from './../common';

function PrivateRouter(props) {
    const { component: Component, layout: Layout, ...rest } = props;
    return (
        <Route
            {...rest}
            render={matchProps => (
                allCommons.checkMeCommon.checkMe(matchProps) ? <Layout {...matchProps}><Component {...matchProps} /></Layout> : <Redirect to="/login" />
            )}
        />
    );
}
export default PrivateRouter;