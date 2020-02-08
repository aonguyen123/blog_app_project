import React from 'react';
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { HeaderDropdown } from './../../components';
import './styles.css';

export default function AvatarDropdown(props) {
    const { userCurrent } = props;
    const onMenuClick = event => {
        const { key } = event;
        console.log('key' + key);
    };

    const menuHeaderDropdown = (
        <Menu style={{minWidth: '160px'}} selectedKeys={[]}>
            <Menu.Item key="center">
                <UserOutlined />
                个人中心
            </Menu.Item>
            <Menu.Item key="settings">
                <SettingOutlined />
                个人设置
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    );

    return userCurrent && userCurrent.name ? (
        <Spin
            size="small"
            style={{
                marginLeft: 8,
                marginRight: 8
            }}
        />
    ) : (
        <HeaderDropdown overlay={menuHeaderDropdown} placement='bottomRight'>
            <span className='dropDown-avatar'>
                <Avatar
                    style={{marginRight: '8px', backgroundColor: '#87d068'}}
                    className='avatar'
                    size="small"
                    icon="user"
                    alt="avatar"
                />
                <span>aonguen</span>
            </span>
        </HeaderDropdown>
    );
}
