import React from 'react';
import { Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

export default function ExtraContent({menu}) {

    return (
        <Dropdown key="more" overlay={menu}>
            <Button
                style={{
                    border: 'none',
                    padding: 0
                }}
            >
                <EllipsisOutlined
                    style={{
                        fontSize: 20,
                        verticalAlign: 'top'
                    }}
                    rotate={90}
                />
            </Button>
        </Dropdown>
    );
}
