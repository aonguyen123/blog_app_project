import React from 'react';
import { Button, Switch } from 'antd';

export default function ListSetting(showModal) {
    return (
        [
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
        ]
    )
}