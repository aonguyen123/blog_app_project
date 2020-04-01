import React from 'react';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
export const headerMenu = [
    {
        id: 'globalHeader.account',
        icon: <UserOutlined className='icon-menu' />,
        link: '/account'
    },
    {
        id: 'globalHeader.setting',
        icon: <SettingOutlined className='icon-menu' />,
        link: '/setting'
    }
]