import React from 'react';
import { Link } from 'react-router-dom';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

export default function CommentItem({ item }) {

    return (
        <Comment
            author={
                <Link to={`/profile/${item.idUser._id}`}>
                    {item.idUser.displayName}
                </Link>
            }
            avatar={item.idUser.photoURL}
            content={item.content}
            datetime={
                <Tooltip
                    title={moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                >
                    <span>
                        {moment(item.createdAt).fromNow()}
                    </span>
                </Tooltip>
            }
        />
    );
}
