import React from 'react';
import { Card } from 'antd';
import CommentItem from './../CommentItem';

export default function RenderList({post}) {
    
    return (
        <Card hoverable style={{ marginBottom: '10px' }}>
            <CommentItem post={post} />
        </Card>
    );
}
