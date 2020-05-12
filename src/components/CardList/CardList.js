import React from 'react';
import { Card } from 'antd';
import CommentItem from './../CommentItem';

export default function CardList({post}) {
    
    return (
        <Card style={{ marginBottom: '10px' }}>
            <CommentItem post={post} />
        </Card>
    );
}
