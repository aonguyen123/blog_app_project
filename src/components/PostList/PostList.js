import React from 'react';
import { Card } from 'antd';
import PostItem from '../PostItem';

export default function PostList({ post, idUser, likePostHome, dislikePostHome, deletePost }) {

    return (
        <Card style={{ marginBottom: '10px' }}>
            <PostItem
                post={post}
                idUser={idUser}
                likePostHome={likePostHome}
                dislikePostHome={dislikePostHome}
                deletePost={deletePost}
            />
        </Card>
    );
}
