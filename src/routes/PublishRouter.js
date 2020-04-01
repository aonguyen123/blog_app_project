import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import allCommons from './../common';

function PublishRouter(props) {
    const { component: Component, layout: Layout, restricted, ...rest } = props;
    return (
        <Route
            {...rest}
            render={matchProps =>
                allCommons.checkMeCommon.checkMe(matchProps) && restricted ? (
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
