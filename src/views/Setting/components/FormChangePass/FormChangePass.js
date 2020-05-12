import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
const { Item } = Form;

export default function FormChangePass({ form }) {
    const layout = {
        labelCol: {span: 9},
        wrapperCol: {span: 12}
    };

    return (
        <Form form={form} {...layout} name="changePasswordForm">
            <Item
                label="Current password"
                name="current_password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your current password'
                    },
                    {
                        min: 6,
                        message: 'Password must be more than 6 characters'
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Current password"
                />
            </Item>
            <Item
                label="New password"
                name="new_password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password'
                    },
                    {
                        min: 6,
                        message: 'Password must be more than 6 characters'
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="New password"
                />
            </Item>
            <Item
                label="Confirm password"
                name="password_comfirm"
                rules={[
                    {
                        required: true,
                        message: 'Please input your confirm password'
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                !value ||
                                getFieldValue('new_password') === value
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
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm password"
                />
            </Item>
        </Form>
    );
}
