import React from 'react';
import moment from 'moment';
import './styles.css';

export default function ChatItem({ message, IDuserCurrent }) {
    if (IDuserCurrent === message.sender._id) {
        return (
            <div className="content_chat_send">
                <div className="img_cont_msg_send">
                    <img
                        src={message.sender.photoURL}
                        alt="avatar"
                        className="rounded-circle user_img_msg"
                    />
                </div>
                <div className="msg_cotainer_send">
                    <p>{message.message}</p>
                    <span className="msg_time_send">
                        {moment(message.createdAt).format('DD/MM/YYYY, HH:mm a')}, {message.sender.displayName}
                    </span>
                </div>
            </div>
        );
    }
    return (
        <div className="content_chat">
            <div className="img_cont_msg">
                <img
                    src={message.sender.photoURL}
                    alt="avatar"
                    className="rounded-circle user_img_msg"
                />
            </div>
            <div className="msg_cotainer">
                <p>{message.message}</p>
                <span className="msg_time">
                    {moment(message.createdAt).format('DD/MM/YYYY, HH:mm a')}, {message.sender.displayName}
                </span>
            </div>
        </div>
    );
}
