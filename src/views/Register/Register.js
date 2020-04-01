import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Form,
    Input,
    Tooltip,
    Select,
    Button,
    Row,
    Col,
    Divider,
    Radio,
    DatePicker
} from 'antd';
import {
    QuestionCircleOutlined,
    FormOutlined as RegisterIcon
} from '@ant-design/icons';
import moment from 'moment';
import { GridContent } from '@ant-design/pro-layout';
import { Residence } from './Components';
import allActions from './../../actions';
import './styles.css';

const { Option } = Select;

export default function Register(props) {
    const { history } = props;
    const [nickname, setNickname] = useState('');
    const dispatch = useDispatch();
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);

    const dateFormat = 'DD/MM/YYYY';

    const onFinish = values => {
        const { birthday, residence } = values;
        values.residence.provinceOrCity = residence.valueResidence[0];
        values.residence.district = residence.valueResidence[1];
        values.birthday = moment(birthday._d).format('DD/MM/YYYY');
        values.nickname = nickname;
        dispatch(allActions.authenticatedActions.register(values, history));
    };

    const prefixSelector = (
        <Select style={{ width: 70 }} value="84">
            <Option value="84">+84</Option>
        </Select>
    );

    const checkResidence = (rule, value) => {
        if (value) {
            if (value.valueResidence.length !== 2) {
                return Promise.reject('Please input your district!');
            }
        }
        return Promise.resolve();
    };
    const disableDate = currentDate => {
        return currentDate && currentDate > moment().endOf('day');
    };
    const checkNickname = (rule, value) => {
        if (value) {
            value = value.trim();
            value = value.replace(/\s+/g, '');
            if (value.length < 5) {
                return Promise.reject('Nickname of at least 5 characters');
            }
            setNickname(value);
            return Promise.resolve();
        }
        setNickname('');
        return Promise.resolve();
    };

    return (
        <GridContent>
            <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ minHeight: '100vh' }}
            >
                <Col xl={7} lg={7} md={10} sm={15} xs={24}>
                    <Form
                        layout="vertical"
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        initialValues={{
                            gender: 'Nam'
                        }}
                    >
                        <Divider>
                            <RegisterIcon
                                style={{ marginRight: '8px', color: '#08c' }}
                            />
                            <span style={{ color: '#08c' }}>Register</span>
                        </Divider>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            hasFeedback
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!'
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                                {
                                    min: 6,
                                    message: 'Password must be more than 6 characters'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            'The two passwords that you entered do not match!'
                                        );
                                    }
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label={
                                <span>
                                    Nickname&nbsp;
                                    <Tooltip title="What do you want others to call you?">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }
                            required
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name='nickname'
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your nickname!'
                                        },
                                        {
                                            whitespace: true,
                                            message:
                                                'Nickname does not whitespace'
                                        },
                                        {
                                            max: 15,
                                            message:
                                                'Nickname cannot exceed 15 characters'
                                        },
                                        {
                                            validator: checkNickname
                                        }
                                    ]}
                                >
                                    <Input style={{ width: '50%' }} />
                                </Form.Item>
                                <Form.Item noStyle>
                                    <Input
                                        style={{ width: '50%' }}
                                        value={nickname}
                                        disabled
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose gender'
                                }
                            ]}
                        >
                            <Radio.Group className="group-radio-register">
                                <Radio.Button
                                    className="radio-item"
                                    value="Nam"
                                >
                                    Nam
                                </Radio.Button>
                                <Radio.Button className="radio-item" value="Nữ">
                                    Nữ
                                </Radio.Button>
                                <Radio.Button
                                    className="radio-item"
                                    value="Khác"
                                >
                                    Khác
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Birthday"
                            name="birthday"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose birthday'
                                }
                            ]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format={dateFormat}
                                disabledDate={disableDate}
                            />
                        </Form.Item>

                        <Form.Item
                            name="residence"
                            label="Habitual Residence"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please select your habitual residence!'
                                },
                                {
                                    validator: checkResidence
                                }
                            ]}
                        >
                            <Residence />
                        </Form.Item>

                        <Form.Item
                            name="phonenumber"
                            label="Phone Number"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                },
                                {
                                    len: 9,
                                    message: 'Phone number must be 10 numbers'
                                }
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                                type="number"
                            />
                        </Form.Item>
                        <Form.Item>
                            You have a account, login here{' '}
                            <Link to="/login">login</Link>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<RegisterIcon />}
                                loading={loadingButton}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </GridContent>
    );
}
