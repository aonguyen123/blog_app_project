import React from 'react';
import moment from 'moment';
import './styles.css';

export default function ChatItem({
    message: { user, text, _id, photoURL, time },
    userCurrent
}) {
    let isCurrentUser = false;

    if (_id) {
        if (userCurrent._id === _id) {
            isCurrentUser = true;
        }
        return isCurrentUser ? (
            <div className="content_chat_send">
                <div className="img_cont_msg_send">
                    <img
                        src={photoURL}
                        alt="avatar"
                        className="rounded-circle user_img_msg"
                    />
                </div>
                <div className="msg_cotainer_send">
                    <p>{text}</p>
                    <span className="msg_time_send">{moment(time).format('DD/MM/YYYY, HH:mm a')}, {user}</span>
                </div>
            </div>
        ) : (
            <div className="content_chat">
                <div className="img_cont_msg">
                    <img
                        src={photoURL}
                        alt="avatar"
                        className="rounded-circle_chat user_img_msg"
                    />
                </div>
                <div className="msg_cotainer">
                    <p>{text}</p>
                    <span className="msg_time">{moment(time).format('DD/MM/YYYY, HH:mm a')}, {user}</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="msg_cotainer_admin">
                <p>{text}</p>
                <span className="msg_time">{moment(time).format('DD/MM/YYYY, HH:mm a')}, {user}</span>
            </div>
        );
    }
}
