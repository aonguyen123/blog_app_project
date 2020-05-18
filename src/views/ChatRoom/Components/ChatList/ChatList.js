import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Input, Tooltip } from 'antd';
import { SendOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import ChatItem from './../ChatItem';
import { ScrollToBottomCom } from './../../../../components';
import './styles.css';

const { Meta } = Card;
const { TextArea } = Input;

export default function ChatList({ onSendMessage, userCurrent, handleLeaveRoom }) {
    const [message, setMessage] = useState('');
    const roomInfo = useSelector(state => state.chatsReducer.roomInfo);
    const messageInRoom = useSelector(
        state => state.chatsReducer.messageInRoom
    );
    return (
        <Card
            hoverable
            size="small"
            title="Messages"
            extra={[
                <Tooltip placement="topRight" title='Leave room' key="leaveRoom">
                    <UsergroupDeleteOutlined onClick={() => handleLeaveRoom(roomInfo._id, userCurrent._id)} />
                </Tooltip>
            ]}
        >
            <Meta
                avatar={
                    <div className="img_cont_chat">
                        <img
                            alt="avatar"
                            src={roomInfo.roomImage}
                            className="rounded-circle_chat user_img_chat"
                        />
                    </div>
                }
                title={roomInfo.roomName}
                description={
                    roomInfo.userId && `${roomInfo.userId.displayName} created`
                }
            />
            <div className="chat_list_card_body_chat chat_list_msg_card_body">
                <ScrollToBottomCom height="350px" width="100%">
                    {messageInRoom.map((value, key) => (
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
                        placeholder="Please your message input!"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={message}
                        onChange={ev => setMessage(ev.target.value)}
                        onKeyDown={ev => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                                onSendMessage({ message });
                                setMessage('');
                            }
                        }}
                    />
                    <SendOutlined
                        style={{ width: '10%' }}
                        onClick={ev => {
                            ev.preventDefault();
                            onSendMessage({ message });
                            setMessage('');
                        }}
                    />
                </Input.Group>
            </div>
        </Card>
    );
}
