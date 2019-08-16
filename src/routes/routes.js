import React from 'react';
import Taskboard from './../containers/Taskboard/index'
import SignIn from './../containers/SignIn/index';
import NotFound from './../containers/NotFound/index';

const routes = [
    {
        path: '/',
        exact: true,
        main: (location) => <Taskboard location={location} />
    },
    {
        path: '/signin',
        exact: false,
        main: () => <SignIn />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    }
]
export default routes;