import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import socketIOClient from 'socket.io-client';
import { UsersList, Chat } from './components';
import Context from './../../context';
import allActions from '../../actions';
import { ROOT_URL_SERVER } from './../../constants/base_url';
import './styles.css';

let socket;
export default function Messager() {
    const [chats, setChats] = useState([]);
    const userCurrent = useContext(Context);
    const usersOnline = useSelector(state => state.userReducer.usersOnline);
    const dispatch = useDispatch();

    useEffect(() => {
        socket = socketIOClient(ROOT_URL_SERVER);
       
        socket.emit('join', {
            _id: userCurrent._id,
            displayName: userCurrent.displayName,
            photoURL: userCurrent.photoURL,
            time: Date.now(),
            room: 'default'
        });
        
        return () => {
            socket.close();
        }
    }, [userCurrent]);
    useEffect(() => {
        socket.on('message', message => {
           setChats(chats => [...chats, message]);
        });
        socket.on('roomData', data => {
            console.log(data)
            dispatch(allActions.userActions.getUsersOnline(data.users));
        })
    }, [dispatch]);

    const onSendMessage = useCallback(({message, time}) => {
        if(message) {
            socket.emit('sendMessage', {message, time});
        }
    }, []);

    return (
        <Row gutter={[16, 16]}>
            <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                <UsersList usersOnline={usersOnline} />
            </Col>
            <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                <Chat 
                    onSendMessage={onSendMessage}
                    chats={chats}
                    userCurrent={userCurrent}
                />
            </Col>
        </Row>
    );
}
