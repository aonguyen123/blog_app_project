import React from 'react';
import {    
    HistoryOutlined,
    MessageOutlined,
    CloudOutlined
} from '@ant-design/icons';
export const siderMenu = [
    {
        id: 'menu.history',
        icon: <HistoryOutlined />,
        link: '/historys'
    },
    {
        id: 'menu.message',
        icon: <MessageOutlined />,
        link: '/chats'
    },
    {
        id: 'menu.weather',
        icon: <CloudOutlined />,
        link: '/weather'
    }
];
