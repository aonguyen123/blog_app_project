import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { siderMenu } from './../../constants/sider-menu';
import './styles.css';

const { Sider } = Layout;

export default function SiderMenu() {
    const [broken, setBroken] = useState('')

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

    const handleBreak = broken => {
        broken ? setBroken({position: "absolute", zIndex: '99'}) : setBroken('');
    };
    const handleCollapse = (collapsed, type) => {};

    return (
        <Sider
            className='sider-menu'
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={handleBreak}
            onCollapse={handleCollapse}
            style={{...broken}}
        >
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['4']}
                style={{height: '100vh'}}
            >
                {renderSiderMenu()}
            </Menu>
        </Sider>
    );
}
