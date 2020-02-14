import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GridContent } from '@ant-design/pro-layout';
import { Divider, Row, Col, Icon, Button, Form, Input } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import { login } from './../../actions';
import { AlertErrors } from './../../components';
import './styles.css';

function LoginForm(props) {
    const { auth, login, errors, history } = props;
    const { getFieldDecorator } = props.form;

    const [iconLoading, setIconLoading] = useState(false);
    const [notice, setNotice] = useState('');

    useEffect(() => {
        setNotice(errors.message);
    }, [errors]);
    useEffect(() => {
        setIconLoading(false);
    }, [auth, errors]);
    useEffect(() => {
        setNotice('');
    }, [auth]);

    const handleSubmit = e => {
        e.preventDefault();
        setNotice('');
        props.form.validateFields((err, values) => {
            if (!err) {   
                setIconLoading(true);
                login(values.email, values.password, history);
            }
        });
    };
    const validate = (rule, value, callback) => {
        const { form } = props;
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    return (
        <GridContent>
            <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ minHeight: '100vh' }}
            >
                <Col lg={7} md={10} sm={15} xs={20}>
                    <Form onSubmit={handleSubmit} className="login-form">
                        <Divider>
                            <Icon
                                className='icon-login'
                                type="login"
                            />
                            <span style={{ color: '#08c' }}><FormattedMessage id='login.login' /></span>
                        </Divider>
                        {notice && <AlertErrors message={notice} type="error" />}
                        <Form.Item hasFeedback>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: formatMessage({id: 'login.validEmail'})
                                    },
                                    {
                                        required: true,
                                        message: formatMessage({id: 'login.requiredEmail'})
                                    },
                                    {
                                        validator: validate
                                    }
                                ]
                            })(
                                <Input
                                    allowClear
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder={formatMessage({id: 'login.email'})}
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({id: 'login.requiredPassword'})
                                    },
                                    {
                                        validator: validate
                                    },
                                    {
                                        min: 6,
                                        message: formatMessage({id: 'login.lengPassword'})
                                    }
                                ]
                            })(
                                <Input.Password
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    allowClear
                                    type="password"
                                    placeholder={formatMessage({id: 'login.password'})}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                icon="login"
                                loading={iconLoading}
                            >
                                <FormattedMessage id='login.login' />
                            </Button>
                            <div>
                                <FormattedMessage id='login.loginMethod' />
                                <Button
                                    className="btn-google"
                                    type="dashed"
                                    shape="circle"
                                    icon="google"
                                    size="default"
                                />
                                <Button
                                    type="dashed"
                                    shape="circle"
                                    icon="facebook"
                                    size="default"
                                />
                                <Button
                                    className="btn-register"
                                    type="link"
                                    href="foo"
                                >
                                    <FormattedMessage id='login.register' />
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </GridContent>
    );
}
const SignIn = Form.create({ name: 'login' })(LoginForm);

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { login }
)(SignIn);
