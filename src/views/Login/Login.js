import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GridContent } from '@ant-design/pro-layout';
import {
    LoginOutlined,
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import {
    Divider,
    Row,
    Col,
    Button,
    Form,
    Input
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import allActions from './../../actions';
import './styles.css';

function Login(props) {
    const { history } = props;
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const dispatch = useDispatch();

    const onFinish = async values => {
        dispatch(
            allActions.authenticatedActions.signin(values.email, values.password, history)
        );
    };  
    // const googleSignIn = async () => {
    //     try {
    //         await allServices.firebaseService.signInWithGoogle().then(result => {
    //             const { providerId } = result.credential;

    //             // const token = result.credential.accessToken;
                
    //             const user = result.user.providerData.filter(profile => profile.providerId === providerId)[0];
    //             allConfigs.setAuthTokenConfigs.setAuthToken(providerId);
    //             dispatch(allActions.authenticatedActions.authenticatedSuccess());
    //             dispatch(allActions.userActions.fetchUserSuccess(user));
    //         });
    //     } catch (error) {
    //         dispatch(allActions.authenticatedActions.loginErrors(error.message));
    //     }
    // }

    return (
        <GridContent>
            <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ minHeight: '100vh' }}
            >
                <Col xl={7} lg={7} md={10} sm={15} xs={24}>
                    <Form onFinish={onFinish}>
                        <Divider>
                            <LoginOutlined
                                style={{ marginRight: '8px', color: '#08c' }}
                            />
                            <span style={{ color: '#08c' }}>
                                <FormattedMessage id="login.login" />
                            </span>
                        </Divider>
                        <Form.Item
                            hasFeedback
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'login.requiredEmail'
                                    })
                                },
                                {
                                    type: 'email',
                                    message: formatMessage({
                                        id: 'login.validEmail'
                                    })
                                }
                            ]}
                        >
                            <Input
                                allowClear
                                prefix={<UserOutlined />}
                                placeholder={formatMessage({
                                    id: 'login.email'
                                })}
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'login.requiredPassword'
                                    })
                                },
                                {
                                    min: 6,
                                    message: formatMessage({
                                        id: 'login.lengPassword'
                                    })
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                allowClear
                                type="password"
                                placeholder={formatMessage({
                                    id: 'login.password'
                                })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                icon={<LoginOutlined />}
                                loading={loadingButton}
                            >
                                <FormattedMessage id="login.login" />
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            {/* <FormattedMessage id="login.loginMethod" />
                            <Button
                                onClick={googleSignIn}
                                className="btn-google"
                                type="dashed"
                                shape="circle"
                                icon={<GoogleOutlined />}
                                size="default"
                            />
                            <Button
                                type="dashed"
                                shape="circle"
                                icon={<FacebookOutlined />}
                                size="default"
                            /> */}
                            <Button className="btn-register" type="link">
                                <Link to="/register">
                                    <FormattedMessage id="login.register" />
                                </Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </GridContent>
    );
}

export default Login;