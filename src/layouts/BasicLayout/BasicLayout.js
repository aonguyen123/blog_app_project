import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Affix } from 'antd';
import { LazyLoading, GlobalHeader, GlobalFootter, SiderMenu } from './../../components';
import allActions from './../../actions';
import allConfigs from './../../config';
import './styles.css';
const { Header, Content, Footer } = Layout;

export default function BasicLayout(props) {
    const { children } = props;
    const userInfo = useSelector(state => state.userReducer.userInfo);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(Object.keys(userInfo).length === 0)
        {
            const idUser = allConfigs.tokenConfigs.getIdUser();
            dispatch(allActions.userActions.fetchUser(idUser, history));
        }
    }, [dispatch, history, userInfo]);

    return (
        <Layout>
            <Header className='header-layout-basic'>
                <GlobalHeader />
            </Header>
            <Layout style={{background: '#fff'}}>
                <Affix>
                    <SiderMenu />
                </Affix>
                <Layout>
                    <Content>
                        <div className='content-layout-basic'>
                            <Suspense fallback={<LazyLoading />}>
                                {children}
                            </Suspense>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', background: '#000'}} >
                        <GlobalFootter />
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
