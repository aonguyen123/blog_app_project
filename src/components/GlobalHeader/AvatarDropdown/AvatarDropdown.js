import React from 'react';
import { withRouter } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from '../../HeaderDropdown';
import { headerMenu } from './../../../constants/header-menu';
import './styles.css';

const AvatarDropdown = (props) => {
    const { userCurrent, history } = props;

    const renderMenuHeader = () =>
        headerMenu.map(menu => (
            <Menu.Item key={menu.id} onClick={() => history.push(menu.link)}>
                {menu.icon}
                <FormattedMessage id={menu.id} />
            </Menu.Item>
        ));

    const menuHeaderDropdown = (
        <Menu style={{ minWidth: '160px' }} selectedKeys={[]}>
            {renderMenuHeader()}
            <Menu.Divider />
            <Menu.Item key="logout" onClick={() => history.push('/logout')}>
                <LogoutOutlined />
                <FormattedMessage id="globalHeader.logout" />
            </Menu.Item>
        </Menu>
    );

    return userCurrent && userCurrent.name ? (
        <Spin
            size="small"
            style={{
                margin: '25px 0 0 20px',
                textAlign: 'center'
            }}
        />
    ) : (
        <HeaderDropdown overlay={menuHeaderDropdown} placement="bottomRight">
            <span className="dropDown-avatar">
                <Avatar
                    style={{ marginRight: '8px', backgroundColor: '#87d068' }}
                    className="avatar"
                    size="small"
                    icon="user"
                    alt="avatar"
                />
                <span>aonguen</span>
            </span>
        </HeaderDropdown>
    );
}
export default withRouter(AvatarDropdown);