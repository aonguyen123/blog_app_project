import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { AccountInfo, AccountRight } from './components';
import allActions from '../../actions';

export default function Account() {
    const postsById = useSelector(state => state.postReducer.postsById);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.postActions.fetchPostById(userCurrent._id, 1, 10));

        return () => {
            dispatch(allActions.postActions.unmountPostById());
        };
    }, [userCurrent._id, dispatch]);

    const memoAccountInfo = useMemo(() => {
        return (
            <AccountInfo
                userInfo={userCurrent}
                userCurrentId={userCurrent._id}
            />
        );
    }, [userCurrent]);
    const likePostHome = idPost => {
        dispatch(allActions.postActions.likePost(userCurrent._id, idPost));
    };
    const dislikePostHome = idPost => {
        dispatch(allActions.postActions.dislikePost(userCurrent._id, idPost));
    };

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
                        likePostHome={likePostHome}
                        dislikePostHome={dislikePostHome}
                    />
                </Col>
            </Row>
        </GridContent>
    );
}
