import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Affix, BackTop } from 'antd';
import io from 'socket.io-client';
import {
    LazyLoading,
    GlobalHeader,
    GlobalFootter,
    SiderMenuLeft,
    FetchDataLoading
} from './../../components';
import allConfigs from '../../config';
import allActions from '../../actions';
import Context from '../../context';
import { ROOT_URL_SERVER } from './../../constants/base_url';
import './styles.css';
const { Header, Content, Footer, Sider } = Layout;

function BasicLayout(props) {
    const { children } = props;
    const [collapsedWidth, setCollapseWidth] = useState(false);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const socketRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const server = ROOT_URL_SERVER;
        socketRef.current = io(server);

        return () => {
            socketRef.current.close();
        }
    }, []);
    useEffect(() => {
        const idUser = allConfigs.tokenConfigs.getIdUser();
        if (idUser) {
            dispatch(allActions.userActions.fetchUser(idUser));
        }
        else {
            dispatch(allActions.authenticatedActions.authenticatedFail());
        }
        socketRef.current.on('notice', ({text}) => {
            dispatch(allActions.chatsActions.getStatusChat(text));
        });

        return () => {
            socketRef.current.off('notice');
        }
    }, [dispatch, history]);

    if (Object.keys(userCurrent).length === 0) {
        return (
            <FetchDataLoading className='loading-fetchData-basicLayout' />
        );
    }
    return (
        <Layout>
            <Header>
                <Context.Provider value={userCurrent}>
                    <GlobalHeader />
                </Context.Provider>
            </Header>
            <Layout>
                <Sider
                    theme={collapsedWidth ? 'dark' : 'light'}
                    breakpoint="lg"
                    collapsedWidth='0'
                    onBreakpoint={broken => {
                        setCollapseWidth(broken);
                    }}
                    style={collapsedWidth ? {position: 'fixed', zIndex: '99'} : {padding: '24px 14px'}}
                >
                    <Affix>
                        <SiderMenuLeft collapsedWidth={collapsedWidth} />   
                    </Affix>
                </Sider>
                
                <Content>
                    <div className="content-layout-basic">
                        <Suspense fallback={<LazyLoading />}>
                            <Context.Provider value={{userCurrent, socketRef}}>
                                {children}
                            </Context.Provider>
                        </Suspense>
                    </div>
                </Content>
            </Layout>
            <Footer style={{ backgroundColor: '#000', textAlign: 'center' }}>
                <GlobalFootter />
            </Footer>
            <BackTop />
        </Layout>
    );
}
export default BasicLayout;
