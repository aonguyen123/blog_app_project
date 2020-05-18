import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Affix, BackTop } from 'antd';
import io from 'socket.io-client';
import {
    LazyLoading,
    GlobalHeader,
    GlobalFootter,
    SiderMenuLeft,
    Animation
} from './../../components';
import allActions from '../../actions';
import Context from '../../context';
import { ROOT_URL_SERVER } from './../../constants/base_url';
import './styles.css';
const { Header, Content, Footer, Sider } = Layout;

function BasicLayout(props) {
    const { children } = props;
    const [collapsedWidth, setCollapseWidth] = useState(false);
    const isShowAnimate = useSelector(state => state.uiReducer.isShowAnimate);
    const typeAnimate = useSelector(state => state.uiReducer.typeAnimate);
    const socketRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const server = ROOT_URL_SERVER;
        socketRef.current = io(server);

        return () => {
            socketRef.current.close();
        }
    }, []);
    useEffect(() => {
        socketRef.current.on('notice', ({text}) => {
            dispatch(allActions.chatsActions.getStatusChat(text));
        });

        return () => {
            socketRef.current.off('notice');
        }
    }, [dispatch]);

    return (
        <Layout>
            <Header>
                <GlobalHeader />
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
                            <Context.Provider value={{socketRef}}>
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
            {isShowAnimate && <Animation typeAnimate={typeAnimate} />}
        </Layout>
    );
}
export default BasicLayout;
