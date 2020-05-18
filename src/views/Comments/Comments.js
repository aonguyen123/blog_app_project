import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import { CommentEditor, CommentList } from './components';
import PostItem from './../../components/PostItem';
import { FetchDataLoading } from './../../components';
import allActions from '../../actions';

export default function Comments() {
    const { idPost } = useParams();
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const comments = useSelector(state => state.commentReducer.comments);
    const post = useSelector(state => state.commentReducer.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.commentActions.fetchCommentByIdPost(idPost));
    }, [idPost, dispatch]);

    const addCommentPost = value => {
        if (!value) return;
        dispatch(
            allActions.commentActions.addComment(
                post._id,
                userCurrent._id,
                value
            )
        );
    };
    const likePostHome = idPost => {
        dispatch(allActions.postActions.likePost(userCurrent._id, idPost));
    };
    const dislikePostHome = idPost => {
        dispatch(allActions.postActions.dislikePost(userCurrent._id, idPost));
    };

    if (Object.keys(post).length === 0) return <FetchDataLoading />;
    return (
        <Row>
            <Col xxl={15} xl={15} lg={15} md={15} sm={24} xs={24}>
                <Card>
                    <PostItem
                        post={post}
                        idUser={userCurrent._id}
                        likePostHome={likePostHome}
                        dislikePostHome={dislikePostHome}
                    >
                        <CommentList comments={comments} />
                        <CommentEditor
                            userInfo={{ photoURL: userCurrent.photoURL }}
                            addCommentPost={addCommentPost}
                            loadingButton={loadingButton}
                        />
                    </PostItem>
                </Card>
            </Col>
            <Col xxl={9} xl={9} lg={9} md={9} sm={24} xs={24}></Col>
        </Row>
    );
}
