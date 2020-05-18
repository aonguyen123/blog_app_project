import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { ToolPost, ListContent } from './Components';
import allActions from '../../actions';

export default function Home() {
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const posts = useSelector(state => state.postReducer.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.postActions.fetchPost(1, 10));

        return () => {
            dispatch(allActions.postActions.unmountPostById());
        };
    }, [dispatch]);

    const ToolPostMemo = useMemo(() => <ToolPost userCurrent={userCurrent} />, [
        userCurrent
    ]);
    const likePostHome = idPost => {
        dispatch(allActions.postActions.likePost(userCurrent._id, idPost));
    }
    const dislikePostHome = idPost => {
        dispatch(allActions.postActions.dislikePost(userCurrent._id, idPost));
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xl={15} lg={15} md={15} sm={24} xs={24}>
                    <Row gutter={[20, 20]}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            {ToolPostMemo}
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <ListContent
                                posts={posts}
                                idUser={userCurrent._id}
                                likePostHome={likePostHome}
                                dislikePostHome={dislikePostHome}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xl={9} lg={9} md={9} sm={24} xs={24}></Col>
            </Row>
        </>
    );
}
