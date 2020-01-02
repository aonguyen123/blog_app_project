import React from 'react';
import SignIn from '../containers/page/SignIn/index';
import NotFound from '../containers/page/NotFound/index';
import Home from './../containers/page/Home/index';
import SignUp from '../containers/page/SignUp/index'
import ImportFile from './../containers/page/Importfile/ImportFile';

const routes = [
    {
        path: '/',
        exact: true,
        main: (location) => <Home location={location} />
    },
    {
        path: '/signin',
        exact: false,
        main: () => <SignIn />
    },
    {
        path: '/signup',
        exact: false,
        main: () => <SignUp />
    },
    {
        path: '/importFile',
        exact: false,
        main: () => <ImportFile />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    }
]
export default routes;