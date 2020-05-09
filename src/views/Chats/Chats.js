import React, { useEffect, useContext, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, message } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { ListRoom, ChatRoomDefault } from './Components';
import Context from './../../context';
import allActions from '../../actions';
import './styles.css';

const Chats = () => {
    const { socketRef } = useContext(Context);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
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
        };
    }, [socketRef, userCurrent._id]);

    useEffect(() => {
        const socket = socketRef.current;
        socket.on('message', message => {
            dispatch(allActions.chatsActions.getChatAfter(message));
        });
        socket.on('createRoom', data => {
            dispatch(allActions.chatsActions.getRoomAfter(data));
            dispatch(allActions.uiActions.hideLoadingButton());
        });
        socket.on('onJoin', data => {
            history.push(`${url}/${data.idRoom._id}`);
            dispatch(allActions.uiActions.hideLoadingButton());
        });
        socket.on('welcome', ({ text }) => {
            message.info(text, 4);
        });
        socket.on('deleteRoom', data => {
            dispatch(allActions.chatsActions.deleteRoom(data));
        })

        return () => {
            socket.off('welcome');
            socket.off('message');
            socket.off('createRoom');
            socket.off('onJoin');
            socket.off('deleteRoom');
        };
    }, [dispatch, socketRef, history, url]);

    const onSendMessage = useCallback(
        ({ message }) => {
            if (message) {
                socketRef.current.emit('sendMessage', { message });
            }
        },
        [socketRef]
    );
    const deleteRoom = useCallback((idRoom) => {
        socketRef.current.emit('deleteRoom', {idRoom});
    }, [socketRef]);

    return (
        <GridContent>
            <Row gutter={[16, 16]}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <ListRoom socketRef={socketRef} _id={userCurrent._id} onConfirm={deleteRoom} />
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
