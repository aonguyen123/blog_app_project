import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Affix, BackTop } from 'antd';
import io from 'socket.io-client';
import {
    LazyLoading,
    GlobalHeader,
    GlobalFootter,
    SiderMenuLeft,
    Animation
} from 'components';
import allActions from 'actions';
import Context from 'context';
import { ROOT_URL_SERVER } from 'constants/base_url';
import './styles.css';
const { Header, Content, Footer, Sider } = Layout;

function BasicLayout(props) {
    const { children } = props;
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const [collapsedWidth, setCollapseWidth] = useState(false);
    const isShowAnimate = useSelector(state => state.uiReducer.isShowAnimate);
    const typeAnimate = useSelector(state => state.uiReducer.typeAnimate);
    const socketRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.eventsActions.fetchEvents(userCurrent._id));

        return () => {
            dispatch(allActions.eventsActions.cleanEvents());
        }
    }, [dispatch, userCurrent._id]);
    useEffect(() => {
        const server = ROOT_URL_SERVER;
        socketRef.current = io(server);
        socketRef.current.emit('subscribe', userCurrent._id);

        return () => {
            socketRef.current.close();
        };
    }, [userCurrent._id]);
    useEffect(() => {
        socketRef.current.on('notice', ({ text }) => {
            dispatch(allActions.chatsActions.getStatusChat(text));
        });
        socketRef.current.on('subscribe', data => {
            // console.log(data); //dung de biet user online o home
        });
        socketRef.current.on('sendEvent', ({ newEvent }) => {
            dispatch(allActions.eventsActions.sendEventAddFriend(newEvent));
        });
        socketRef.current.on('addFriend', ({friendSender}) => {
            dispatch(allActions.userActions.addFriendSuccess(friendSender));
        });
        socketRef.current.on('addFriendCancel', ({idEvent}) => {
            dispatch(allActions.eventsActions.removeEventSuccess(idEvent));
        });
        socketRef.current.on('addFriendSuccess',({ friendReceiver, idEvent }) => {
            dispatch(allActions.userActions.addFriendSuccess(friendReceiver));
            dispatch(allActions.eventsActions.removeEventSuccess(idEvent));
        });
        socketRef.current.on('unFriend', ({idUser}) => {
            dispatch(allActions.eventsActions.unFriend(idUser));
        });

        return () => {
            socketRef.current.off('notice');
            socketRef.current.off('sendEvent');
            socketRef.current.off('subscribe');
            socketRef.current.off('addFriendSuccess');
            socketRef.current.off('addFriend');
            socketRef.current.off('addFriendCancel');
            socketRef.current.off('unFriend');
        };
    }, [dispatch]);
    
    const GlobalHeaderMemo = useMemo(() => {
        return (
            <Context.Provider value={{ socketRef }}>
                <GlobalHeader />
            </Context.Provider>
        );
    }, []);

    return (
        <Layout>
            <Header>{GlobalHeaderMemo}</Header>
            <Layout>
                <Sider
                    theme={collapsedWidth ? 'dark' : 'light'}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        setCollapseWidth(broken);
                    }}
                    style={
                        collapsedWidth
                            ? { position: 'fixed', zIndex: '99' }
                            : { padding: '24px 14px' }
                    }
                >
                    <Affix>
                        <SiderMenuLeft collapsedWidth={collapsedWidth} />
                    </Affix>
                </Sider>

                <Content>
                    <div className="content-layout-basic">
                        <Suspense fallback={<LazyLoading />}>
                            <Context.Provider value={{ socketRef }}>
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
