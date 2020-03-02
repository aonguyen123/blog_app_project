import React from 'react';
import { Row, Col } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { AccountInfo, AccountRight } from './components';

export default function Account(props) {
    
    return (
        <GridContent>
            <Row gutter={16}>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                    <AccountInfo />
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                    <AccountRight />
                </Col>
            </Row>
        </GridContent>
    );
}
