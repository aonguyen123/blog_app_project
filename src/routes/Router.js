import React, { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { LazyLoading } from '../components';

import PrivateRouter from './PrivateRouter';
import PublishRouter from './PublishRouter';

const BasicLayout = lazy(() => import('../layouts/BasicLayout'));
const MinimalLayout = lazy(() => import('../layouts/MinimalLayout'));

const LoginPage = lazy(() => import('../views/Login'));
const Register = lazy(() => import('./../views/Register'));
const HomePage = lazy(() => import('../views/Home'));
const About = lazy(() => import('../views/About'));
const Account = lazy(() => import('./../views/Account'));
const Setting = lazy(() => import('./../views/Setting'));
const Weather = lazy(() => import('./../views/Weather'));
const Messager = lazy(() => import('./../views/Messager'));
const AuthenticatedPage = lazy(() => import('./../views/Authenticated'));
const NotFoundPage = lazy(() => import('./../views/NotFound'));

export default function Router() {
    const loading = useSelector(state => state.auth.isLoading);
    const isAuth = useSelector(state => state.auth.isAuth);

    if (loading)
        return (
            <Spin
                indicator={
                    <LoadingOutlined className="loading-auth-global" spin />
                }
            />
        );
    return (
        <Suspense fallback={<LazyLoading size="large" />}>
            <Switch>
                <Redirect exact from="/" to="/home" />
                <PrivateRouter
                    component={HomePage}
                    isAuth={isAuth}
                    exact
                    layout={BasicLayout}
                    path="/home"
                />
                <PrivateRouter
                    component={About}
                    isAuth={isAuth}
                    exact
                    layout={BasicLayout}
                    path="/about"
                />
                <PrivateRouter
                    component={Account}
                    isAuth={isAuth}
                    exact
                    layout={BasicLayout}
                    path="/account"
                />
                <PrivateRouter
                    component={Setting}
                    isAuth={isAuth}
                    exact
                    layout={BasicLayout}
                    path="/setting"
                />
                <PrivateRouter
                    component={Weather}
                    isAuth={isAuth}
                    exact
                    layout={BasicLayout}
                    path="/weather"
                />
                <PrivateRouter
                    component={Messager}
                    isAuth={isAuth}
                    exact
                    layout={BasicLayout}
                    path="/message"
                />
                <PublishRouter
                    component={LoginPage}
                    isAuth={isAuth}
                    exact
                    layout={MinimalLayout}
                    path="/login"
                    restricted={true}
                />
                <PublishRouter
                    component={Register}
                    isAuth={isAuth}
                    exact
                    layout={MinimalLayout}
                    path="/register"
                    restricted={true}
                />
                <PublishRouter
                    component={AuthenticatedPage}
                    isAuth={isAuth}
                    exact
                    layout={MinimalLayout}
                    path="/not-authenticated"
                    restricted={false}
                />
                <PublishRouter
                    component={NotFoundPage}
                    isAuth={isAuth}
                    exact
                    layout={MinimalLayout}
                    path="/not-found"
                    restricted={false}
                />
                <Redirect to="/not-found" />
            </Switch>
        </Suspense>
    );
}
