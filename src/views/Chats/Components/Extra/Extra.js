import React from 'react';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';

export default function Extra({handleClick}) {
    return (
        <Menu>
            <Menu.Item onClick={handleClick}>
                <PlusOutlined />
                {formatMessage({id: 'chat.createRoom'})}
            </Menu.Item>
        </Menu>
    );
}
