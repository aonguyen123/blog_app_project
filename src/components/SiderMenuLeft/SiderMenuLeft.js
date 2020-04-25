import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { siderMenu } from '../../constants/sider-menu';
import allConfigs from '../../config';

export default function SiderMenuLeft({ collapsedWidth }) {
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

    const onClick = item => {
        allConfigs.menuConfigs.setSelectedMenu(item.key);
    };

    return (
        <Menu
            theme={collapsedWidth ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={onClick}
        >
            {renderSiderMenu()}
        </Menu>
    );
}
