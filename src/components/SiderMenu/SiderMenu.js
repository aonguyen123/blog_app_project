import React from 'react';
import { Layout, Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { siderMenu } from './../../constants/sider-menu';
import './styles.css';

const { Sider } = Layout;

export default function SiderMenu() {

    const renderSiderMenu = () => {
        return siderMenu.map(menu => {
            return (
                <Menu.Item key={menu.id}>
                    {menu.icon}
                    <FormattedMessage id={menu.id} />
                </Menu.Item>
            )
        })
    }

    const handleBreak = broken => {};
    const handleCollapse = (collapsed, type) => {};

    return (
        <Sider
            className='sider-menu'
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={handleBreak}
            onCollapse={handleCollapse}
        >
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['4']}
            >
                {renderSiderMenu()}
            </Menu>
        </Sider>
    );
}
