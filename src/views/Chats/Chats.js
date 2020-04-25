import React, { useEffect, useContext, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Row, Col, message } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { ListRoom, ToolChat, ChatRoomDefault } from './Components';
import Context from './../../context';
import allActions from '../../actions';
import './styles.css';

const Chats = () => {
    const { userCurrent, socketRef } = useContext(Context);

    const dispatch = useDispatch();
    const history = useHistory();
    const { url } = useRouteMatch();

    useEffect(() => {
        const socket = socketRef.current;
        socket.emit('join', {
            _id: userCurrent._id
        });

        return () => {
            socket.emit('hasLeft');
        }
    }, [socketRef, userCurrent._id]);

    useEffect(() => {
        const socket = socketRef.current;
        socket.on('message', message => {
            dispatch(allActions.chatsActions.getChatAfter(message));
        });
        socket.on('notice', notice => {
            dispatch(allActions.chatsActions.getStatusAfter(notice));
        });
        socket.on('createRoom', data => {
            dispatch(allActions.chatsActions.getRoomAfter(data));
            dispatch(allActions.uiActions.hideLoadingButton());
        });
        socket.on('onJoin', data => {
            history.push(`${url}/${data}`);
            dispatch(allActions.uiActions.hideLoadingButton());
        });
        socket.on('welcome', ({ text }) => {
            message.info(text, 4);
        });

        return () => {
            socket.off('welcome');
            socket.off('message');
            socket.off('notice');
            socket.off('createRoom');
            socket.off('onJoin');
        }
    }, [dispatch, socketRef, history, url]);

    const onSendMessage = useCallback(({ message }) => {
        if (message) {
            socketRef.current.emit('sendMessage', { message });
        }
    }, [socketRef]);
    
    return (
        <GridContent>
            <Row gutter={[16, 16]}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Row gutter={[16, 16]}>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                            <ToolChat />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                                <ListRoom
                                    socketRef={socketRef}
                                    _id={userCurrent._id}
                                />
                        </Col>
                    </Row>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <ChatRoomDefault
                        onSendMessage={onSendMessage}
                        userCurrent={userCurrent}
                    />
                </Col>
            </Row>
        </GridContent>
    );
};

export default Chats;
