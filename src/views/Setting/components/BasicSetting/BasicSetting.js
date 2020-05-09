import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import AvatarSettingView from '../AvatarSettingView';
import { LazyLoading } from './../../../../components';
import allActions from '../../../../actions';

const FormSettingView = lazy(() => import('./../FormSettingView'));

export default function BasicSetting({ userInfo }) {
    const dispatch = useDispatch();
    console.log(userInfo)
    const updatePhotoURL = file => {
        dispatch(allActions.userActions.updatePhotoURL(file.url, userInfo._id));
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <AvatarSettingView
                    photo={userInfo.photoURL}
                    updatePhotoURL={updatePhotoURL}
                />
            </Col>
            <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                <Suspense fallback={<LazyLoading size="small" />}>
                    <FormSettingView userInfo={userInfo} />
                </Suspense>
            </Col>
        </Row>
    );
}
