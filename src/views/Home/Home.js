import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { ToolPost, ListContent } from './Components';
import { Banner } from 'components';
import allActions from 'actions';

export default function Home() {
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const posts = useSelector(state => state.postReducer.posts);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const mentions = useSelector(state => state.postReducer.mentions);
    const loadingFetchData = useSelector(state => state.uiReducer.loadingFetchData);
    const loadingData = useSelector(state => state.uiReducer.loadingData);
    const searchResult = useSelector(state => state.userReducer.searchResult);
    const hasMorePosts = useSelector(state => state.postReducer.hasMoreItems);
    const nextPage = useSelector(state => state.postReducer.nextPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.postActions.fetchPost(1, 10));
        return () => {
            dispatch(allActions.postActions.unmountPostById());
        };
    }, [dispatch]);

    const likePostHome = useCallback(idPost => {
        dispatch(allActions.postActions.likePost(userCurrent._id, idPost));
    }, [dispatch, userCurrent._id]);
    const dislikePostHome = useCallback(idPost => {
        dispatch(allActions.postActions.dislikePost(userCurrent._id, idPost));
    }, [dispatch, userCurrent._id]);

    const ListContentMemo = useMemo(() => (
        <ListContent
            posts={posts}
            idUser={userCurrent._id}
            hasMorePosts={hasMorePosts}
            nextPage={nextPage}
            loadingFetchData={loadingFetchData}
            likePostHome={likePostHome}
            dislikePostHome={dislikePostHome}
        />
    ), [posts, userCurrent._id, hasMorePosts, nextPage, loadingFetchData, likePostHome, dislikePostHome]);
    const ToolPostMemo = useMemo(
        () => (
            <ToolPost
                userCurrent={userCurrent}
                loadingButton={loadingButton}
                mentions={mentions}
                searchResult={searchResult}
                loadingData={loadingData}
            />
        ),
        [userCurrent, loadingButton, mentions, searchResult, loadingData]
    );

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Banner />
                </Col>
                <Col xl={15} lg={15} md={15} sm={24} xs={24}>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>{ToolPostMemo}</Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>{ListContentMemo}</Col>
                    </Row>
                </Col>
                <Col xl={9} lg={9} md={9} sm={24} xs={24}></Col>
            </Row>
        </>
    );
}
