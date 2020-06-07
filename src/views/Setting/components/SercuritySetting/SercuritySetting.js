import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { LazyLoading } from './../../../../components';
import allActions from '../../../../actions';

const SercurityList = lazy(() => import('./../SercurityList'));

export default function SercuritySetting() {
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const loadingData = useSelector(state => state.uiReducer.loadingData);
    const visible = useSelector(state => state.uiReducer.visible);
    const setting = useSelector(state => state.userReducer.setting);
    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(allActions.uiActions.changeVisible(true));
    };
    const closeModal = () => {
        dispatch(allActions.uiActions.changeVisible(false));
    }
    const updatePass = values => {
        dispatch(
            allActions.userActions.updatePassword(
                values.new_password,
                values.current_password,
                userCurrent._id
            )
        );
    };
    const onClickSwitch = (checked) => {
        dispatch(allActions.userActions.settingPhone(userCurrent._id, checked));
    }

    return (
        <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={<LazyLoading size="small" />}>
                    <SercurityList
                        updatePass={updatePass}
                        loadingButton={loadingButton}
                        visible={visible}
                        showModal={showModal}
                        closeModal={closeModal}
                        setting={setting}
                        loadingData={loadingData}
                        onClickSwitch={onClickSwitch}
                    />
                </Suspense>
            </Col>
        </Row>
    );
}
