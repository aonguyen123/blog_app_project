import React, { lazy, Suspense } from 'react';
import { Row, Col } from 'antd';
import { LazyLoading } from './../../../../components';
const SercurityList = lazy(() => import('./../SercurityList'));

export default function SercuritySetting() {
    return (
        <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={<LazyLoading size="small" />}>
                    <SercurityList />
                </Suspense>
            </Col>
        </Row>
    );
}
