import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from '../../HeaderDropdown';
import { headerMenu } from './../../../constants/header-menu';
import allActions from './../../../actions';
import './styles.css';

const AvatarDropdown = ({userCurrent}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const renderMenuHeader = () =>
        headerMenu.map(menu => (
            <Menu.Item key={menu.id} className="menu-avatar-dropdown">
                <NavLink to={menu.link} activeStyle={{color: '#1890FF'}}>
                    {menu.icon}
                    <FormattedMessage id={menu.id} />
                </NavLink>
            </Menu.Item>
        ));
    const onLogout = () => {
        dispatch(allActions.authenticatedActions.signout(history));
    };
    const menuHeaderDropdown = (
        <Menu
            style={{ minWidth: '160px' }}
        >
            {renderMenuHeader()}
            <Menu.Divider />
            <Menu.Item key="logout" onClick={onLogout}>
                <LogoutOutlined />
                <FormattedMessage id="globalHeader.logout" />
            </Menu.Item>
        </Menu>
    );

    return (
        <HeaderDropdown overlay={menuHeaderDropdown} placement="bottomRight">
            <span className="dropDown-avatar">
                <Avatar
                    src={userCurrent.photoURL}
                    style={{ marginRight: '8px' }}
                    className="avatar"
                    size="small"
                    alt="avatar"
                />
                <span>{userCurrent.displayName}</span>
            </span>
        </HeaderDropdown>
    );
};
export default AvatarDropdown;
