import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';
import ChatItem from './../ChatItem';
import { ScrollToBottomCom } from 'components';
import allActions from 'actions';
import './styles.css';

const { TextArea } = Input;

export default function ChatRoomDefault({ onSendMessage, userCurrent }) {
    const [message, setMessage] = useState('');
    const chats = useSelector(state => state.chatsReducer.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.chatsActions.getChats());
    }, [dispatch]);

    return (
        <Card
            hoverable
            size="small"
            title={formatMessage({id: 'chat.chatRoom'})}
        >
            <div className="card_body_chat msg_card_body">
                <ScrollToBottomCom height='400px' width='100%'>
                    {chats.map((value, key) => (
                        <ChatItem
                            key={key}
                            IDuserCurrent={userCurrent._id}
                            message={value}
                        />
                    ))}
                </ScrollToBottomCom>
            </div>

            <div className="card-footer" style={{ padding: '12px' }}>
                <Input.Group compact>
                    <TextArea
                        style={{ width: '90%' }}
                        placeholder={formatMessage({id: 'chat.chatRoom.input'})}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={message}
                        onChange={ev => setMessage(ev.target.value)}
                        onKeyDown={ev => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                                onSendMessage({message});
                                setMessage('');
                            }
                        }}
                    />
                    <SendOutlined
                        style={{ width: '10%' }}
                        onClick={ev => {
                            ev.preventDefault();
                            onSendMessage({message});
                            setMessage('');
                        }}
                    />
                </Input.Group>
            </div>
        </Card>
    );
}
