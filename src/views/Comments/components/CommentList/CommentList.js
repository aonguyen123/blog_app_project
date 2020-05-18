import React from 'react';
import { List } from 'antd';
import CommentItem from '../CommentItem';

export default function CommentList({comments}) {

    return (
        <List
            size='small'
            className="comment-list"
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
                <CommentItem item={item} />
            )}
        />
    );
}
