import React from 'react';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
export const headerMenu = [
    {
        id: 'globalHeader.account',
        icon: <UserOutlined />,
        link: '/account'
    },
    {
        id: 'globalHeader.setting',
        icon: <SettingOutlined />,
        link: '/setting'
    }
]