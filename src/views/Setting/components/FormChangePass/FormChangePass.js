import React from 'react';
import { Form, Input } from 'antd';
const { Item } = Form;

export default function FormChangePass({ form }) {

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 }
    };

    return (
        <Form
            form={form}
            {...formItemLayout}
            layout="horizontal"
            name="changePasswordForm"
        >
            <Item
                label="Current Password"
                name="current_password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your current password'
                    }
                ]}
            >
                <Input.Password />
            </Item>
            <Item
                label="New Password"
                name="new_password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password'
                    }
                ]}
            >
                <Input.Password />
            </Item>
            <Item
                label="Password Comfirm"
                name="password_comfirm"
                rules={[
                    {
                        required: true,
                        message: 'Please input your confirm password'
                    }
                ]}
            >
                <Input.Password />
            </Item>
        </Form>
    );
}
