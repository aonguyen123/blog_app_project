import React from 'react';
import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

export default function ExtraContent({menu}) {

    return (
        <Dropdown key="more" overlay={menu} trigger='click'>
            <Button
                style={{
                    border: 'none',
                    padding: 0
                }}
            >
                <MoreOutlined
                    style={{
                        fontSize: 20
                    }}
                />
            </Button>
        </Dropdown>
    );
}
