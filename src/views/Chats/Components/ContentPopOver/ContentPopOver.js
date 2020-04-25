import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Input, Form, Button } from 'antd';
import { useForm } from 'antd/lib/form/util';

const { Item } = Form;

export default function ContentPopOver({onJoin, idRoom, loadingButton}) {
    const [form] = useForm();
    
    return (
        <Form form={form} layout="inline" size="small" onFinish={value => onJoin(value, idRoom)}>
            <Item 
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Password is required'
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Item>
            <Item>
                <Button type="primary" htmlType="submit" loading={loadingButton}>
                    Join
                </Button>
            </Item>
        </Form>
    );
}
