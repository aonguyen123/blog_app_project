import React, { useState } from 'react';
import { List, Button, Switch, Form } from 'antd';
import ModalView from './../ModalView';

export default function SercurityList(props) {
    const [value, setValue] = useState({
        visible: false
    });

    const showModal = () => {
        setValue({
            ...value,
            visible: true
        });
    };
    const handleCancel = () => {
        setValue({
            ...value,
            visible: false
        });
    };
    const list = [
        {
            name: 'Account Password',
            action: (
                <Button
                    htmlType='button'
                    type="link"
                    onClick={() => showModal()}
                    style={{ margin: 0, padding: 0 }}
                >
                    Modify
                </Button>
            ),
            description: 'Account passwords may be modify'
        },
        {
            name: 'Security Phone',
            action: (
                <Switch
                    checkedChildren="Show"
                    unCheckedChildren="Hide"
                    defaultChecked={false}
                />
            ),
            description: 'Phone numbers can be shown or hidden to everyone'
        }
    ];
    const onFormFinish = (name, { values, forms }) => {
        if (name === 'changePasswordForm') {
            //const { current_password, new_password, password_confirm } = values;
            setValue({
                ...value,
                visible: false
            });
        }
    }

    return (
        <Form.Provider onFormFinish={onFormFinish}>
            <List
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item actions={[item.action]}>
                        <List.Item.Meta
                            title={item.name}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <ModalView
                visible={value.visible}
                handleCancel={handleCancel}
            />
        </Form.Provider>
    );
}
