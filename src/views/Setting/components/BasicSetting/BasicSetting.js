import React, { lazy, Suspense } from 'react';
import { Row, Col } from 'antd';
import AvatarSettingView from '../AvatarSettingView';
import { LazyLoading } from './../../../../components';
const FormSettingView = lazy(() => import('./../FormSettingView'));

export default function BasicSetting(props) {
    const { userInfo } = props;

    return (
        <Row gutter={[16, 16]}>
            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <AvatarSettingView userInfo={userInfo} />
            </Col>
            <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                <Suspense fallback={<LazyLoading size='small' />}>
                    <FormSettingView />
                </Suspense>
            </Col>
        </Row>
    );
}
