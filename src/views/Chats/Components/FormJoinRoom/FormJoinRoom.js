import React from 'react';
import { Form, Input } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
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
                label={formatMessage({id: 'chat.createRoom.roomPass'})}
                name="password_room"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'chat.joinRoom.validRoomPass'})
                    }
                ]}
            >
                <Input.Password />
            </Item>
        </Form>
    );
}
