import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { siderMenu } from './../../constants/sider-menu';
import allConfigs from './../../config';
import './styles.css';

const { Sider } = Layout;

export default function SiderMenu() {
    const [broken, setBroken] = useState('');
    const selectedMenu = allConfigs.menuConfigs.getSelectedMenu();

    const renderSiderMenu = () => {
        return siderMenu.map(menu => {
            return (
                <Menu.Item key={menu.id}>
                    <Link to={menu.link}>
                        {menu.icon}
                        <FormattedMessage id={menu.id} />
                    </Link>
                </Menu.Item>
            );
        });
    };

    const handleBreak = broken => {
        broken
            ? setBroken({ position: 'absolute', zIndex: '99' })
            : setBroken('');
    };
    const handleCollapse = (collapsed, type) => {};
    const onClick = item => {
        allConfigs.menuConfigs.setSelectedMenu(item.key);
    };

    return (
        <Sider
            className="sider-menu"
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={handleBreak}
            onCollapse={handleCollapse}
            style={{ ...broken }}
        >
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedMenu]}
                style={{ height: '100vh' }}
                onClick={onClick}
            >
                {renderSiderMenu()}
            </Menu>
        </Sider>
    );
}
