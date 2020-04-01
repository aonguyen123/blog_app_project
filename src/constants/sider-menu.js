import React from 'react';
import {
    UserOutlined,
    HistoryOutlined,
    MessageOutlined,
    CloudOutlined
} from '@ant-design/icons';
export const siderMenu = [
    {
        id: 'menu.friend',
        icon: <UserOutlined />,
        link: '/friend'
    },
    {
        id: 'menu.history',
        icon: <HistoryOutlined />,
        link: '/history'
    },
    {
        id: 'menu.message',
        icon: <MessageOutlined />,
        link: '/message'
    },
    {
        id: 'menu.weather',
        icon: <CloudOutlined />,
        link: '/weather'
    }
];
