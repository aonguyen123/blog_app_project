import React from 'react';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Extra(handleClick) {
    return (
        <Menu>
            <Menu.Item onClick={handleClick}>
                <PlusOutlined />
                Create room
            </Menu.Item>
            <Menu.Item>2nd menu item</Menu.Item>
            <Menu.Item>3rd menu item</Menu.Item>
        </Menu>
    );
}
