import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { FormOutlined as RegisterIcon} from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import allActions from 'actions';
import { RegisterForm } from './Components';

export default function Register(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);

    const onFinish = values => {
        values.upload = values.upload[0].response.url
        dispatch(allActions.authenticatedActions.register(values, history));
    };

    return (
        <GridContent>
            <Row justify='center'>
                <Col xxl={9} xl={9} lg={10} md={10} sm={10} xs={24}>
                    <Divider>
                        <RegisterIcon
                            style={{ marginRight: '8px', color: '#08c' }}
                        />
                        <span style={{ color: '#08c' }}>{formatMessage({id: 'register.title'})}</span>
                    </Divider>
                    <Row justify='center' align='middle'>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <RegisterForm
                                loadingButton={loadingButton}
                                onFinish={onFinish}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </GridContent>
    );
}
