import React, { useState } from 'react';
import { Card, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
// import Extra from './../Extra';
import ChatItem from './../ChatItem';
// import { ExtraContent } from './../../../../components';
import './styles.css';

const { TextArea } = Input;
const ROOT_CSS = css({
    height: '400px',
    width: '100%'
});

export default function Chat({ onSendMessage, chats, userCurrent }) {
    const [message, setMessage] = useState('');

    return (
        <Card
            hoverable
            size="small"
            //extra={[<ExtraContent key="more" menu={Extra} />]}
            title="Chat room"
        >
            {/* <Meta
                avatar={
                    <div className="img_cont_chat">
                        <img
                            alt="avatar"
                            src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                            className="rounded-circle_chat user_img_chat"
                        />
                        <span className="online_icon_chat"></span>
                    </div>
                }
                title="Ao Nguyen"
                description="2 gio truoc"
            /> */}
            <div className="card_body_chat msg_card_body">
                <ScrollToBottom className={ROOT_CSS} debounce={0}>
                    {chats.map((value, key) => (
                        <ChatItem
                            key={key}
                            userCurrent={userCurrent}
                            message={value}
                        />
                    ))}
                </ScrollToBottom>
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
                                onSendMessage({message, time: Date.now()});
                                setMessage('');
                            }
                        }}
                    />
                    <SendOutlined
                        style={{ width: '10%' }}
                        onClick={ev => {
                            onSendMessage({message, time: Date.now()});
                            setMessage('');
                        }}
                    />
                </Input.Group>
            </div>
        </Card>
    );
}
