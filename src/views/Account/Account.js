import React, { useContext, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { AccountInfo, AccountRight } from './components';
import Context from './../../context';
import allActions from '../../actions';

export default function Account(props) {
    const postsById = useSelector(state => state.postReducer.postsById);
    const { userCurrent } = useContext(Context);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.postActions.fetchPostById(userCurrent._id, 1, 10));

        return () => {
            dispatch(allActions.postActions.unmountPostById());
        };
    }, [userCurrent._id, dispatch]);

    const memoAccountInfo = useMemo(() => {
        return <AccountInfo userInfo={userCurrent} userCurrentId={userCurrent._id} />;
    }, [userCurrent]);

    return (
        <GridContent>
            <Row gutter={16}>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                    {memoAccountInfo}
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                    <AccountRight userId={userCurrent._id} postsById={postsById} />
                </Col>
            </Row>
        </GridContent>
    );
}
