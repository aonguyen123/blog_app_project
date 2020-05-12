import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
const { Item } = Form;

export default function FormJoinRoom({form}) {

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    };
    
    return (
        <Form
            form={form}
            {...layout}
            name="joinRoom"
        >
            <Item
                label="Password"
                name="password_room"
                rules={[
                    {
                        required: true,
                        message: 'Password room required'
                    }
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder='Password' />
            </Item>
        </Form>
    );
}
