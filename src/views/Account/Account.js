import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { AccountInfo, AccountRight } from './components';

export default function Account(props) {
    const userInfo = useSelector(state => state.userReducer.userInfo);
    const postsById = useSelector(state => state.postReducer.postsById)
    const loadingFetchData = useSelector(
        state => state.uiReducer.loadingFetchData
    );

    return (
        <GridContent>
            <Row gutter={16}>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                    <AccountInfo
                        userInfo={userInfo}
                        loadingFetchData={loadingFetchData}
                    />
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                    <AccountRight 
                        userInfo={userInfo} 
                        postsById={postsById}
                    />
                </Col>
            </Row>
        </GridContent>
    );
}
