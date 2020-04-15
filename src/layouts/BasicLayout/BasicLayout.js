import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Affix, BackTop } from 'antd';
import {
    LazyLoading,
    GlobalHeader,
    GlobalFootter,
    SiderMenu,
    FetchDataLoading
} from './../../components';
import allConfigs from '../../config';
import allActions from '../../actions';
import Context from '../../context';
import './styles.css';
const { Header, Content, Footer } = Layout;

export default function BasicLayout(props) {
    const { children } = props;
    const dispatch = useDispatch();
    const userCurrent = useSelector(state => state.userReducer.userInfo);

    useEffect(() => {
        const idUser = allConfigs.tokenConfigs.getIdUser();
        if (idUser) {
            dispatch(allActions.userActions.fetchUser(idUser));
        }
    }, [dispatch]);

    if (Object.keys(userCurrent).length === 0) {
        return (
            <FetchDataLoading
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: 0,
                    right: 0,
                    margin: 'auto'
                }}
            />
        );
    }
    return (
        <Layout>
            <Header className="header-layout-basic">
                <Context.Provider value={userCurrent}>
                    <GlobalHeader />
                </Context.Provider>
            </Header>
            <Layout style={{ background: '#fff' }}>
                <Affix>
                    <SiderMenu />
                </Affix>
                <Layout>
                    <Content>
                        <div className="content-layout-basic">
                            <Suspense fallback={<LazyLoading />}>
                                <Context.Provider value={userCurrent}>
                                    {children}
                                </Context.Provider>
                            </Suspense>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', background: '#000' }}>
                        <GlobalFootter />
                    </Footer>
                </Layout>
            </Layout>
            <BackTop />
        </Layout>
    );
}
