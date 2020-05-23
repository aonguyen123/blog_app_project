import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { siderMenu } from '../../constants/sider-menu';

export default function SiderMenuLeft({ collapsedWidth }) {
    const renderSiderMenu = () => {
        return siderMenu.map(menu => {
            return (
                <Menu.Item key={menu.id}>
                    <NavLink to={menu.link} activeStyle={{color: '#1890FF'}}>
                        {menu.icon}
                        <FormattedMessage id={menu.id} />
                    </NavLink>
                </Menu.Item>
            );
        });
    };

    return (
        <Menu
            theme={collapsedWidth ? 'dark' : 'light'}
            mode="inline"
        >
            {renderSiderMenu()}
        </Menu>
    );
}
