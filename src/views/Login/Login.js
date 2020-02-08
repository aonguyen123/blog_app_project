import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GridContent } from '@ant-design/pro-layout';
import { Divider, Row, Col, Icon, Button, Form, Input } from 'antd';

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
                            <span style={{ color: '#08c' }}>Login</span>
                        </Divider>
                        {notice && <AlertErrors message={notice} type="error" />}
                        <Form.Item hasFeedback>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message:
                                            'The input is not valid E-mail!'
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Email!'
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
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Password!'
                                    },
                                    {
                                        validator: validate
                                    },
                                    {
                                        min: 6,
                                        message:
                                            'Password at least 6 characters'
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
                                    placeholder="Password"
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
                                Log in
                            </Button>
                            <div>
                                Other login methods
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
                                    Register
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
