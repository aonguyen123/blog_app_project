import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { AccountInfo, AccountRight } from './components';
import allActions from '../../actions';

export default function Account() {
    const postsById = useSelector(state => state.postReducer.postsById);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const hasMorePostsById = useSelector(
        state => state.postReducer.hasMoreItemsById
    );
    const nextPageById = useSelector(state => state.postReducer.nextPageById);
    const loadingFetchData = useSelector(state => state.uiReducer.loadingFetchData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.postActions.fetchPostById(userCurrent._id, 1, 10));

        return () => {
            dispatch(allActions.postActions.unmountPostById());
        };
    }, [dispatch, userCurrent._id]);

    const likePostHome = idPost => {
        dispatch(allActions.postActions.likePost(userCurrent._id, idPost));
    };
    const dislikePostHome = idPost => {
        dispatch(allActions.postActions.dislikePost(userCurrent._id, idPost));
    };
    const createInterest = useCallback((interest) => {
        dispatch(allActions.userActions.updateInterest(interest, userCurrent._id));
    }, [dispatch, userCurrent._id]);
    const removeInterest = useCallback((interest) => {
        dispatch(allActions.userActions.removeInterest(interest, userCurrent._id));
    }, [dispatch, userCurrent._id]);
    
    const memoAccountInfo = useMemo(() => {
        return (
            <AccountInfo
                userInfo={userCurrent}
                userCurrentId={userCurrent._id}
                createInterest={createInterest}
                removeInterest={removeInterest}
            />
        );
    }, [userCurrent, createInterest, removeInterest]);
    
    return (
        <GridContent>
            <Row gutter={16}>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                    {memoAccountInfo}
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                    <AccountRight
                        userIdCurrent={userCurrent._id}
                        userIdById={userCurrent._id}
                        postsById={postsById}
                        hasMorePostsById={hasMorePostsById}
                        nextPageById={nextPageById}
                        loadingFetchData={loadingFetchData}
                        likePostHome={likePostHome}
                        dislikePostHome={dislikePostHome}
                    />
                </Col>
            </Row>
        </GridContent>
    );
}
