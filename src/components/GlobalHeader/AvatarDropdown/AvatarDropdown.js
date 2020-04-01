import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from '../../HeaderDropdown';
import { headerMenu } from './../../../constants/header-menu';
import allConfigs from './../../../config';
import allActions from './../../../actions';
import './styles.css';

const AvatarDropdown = props => {
    const { history } = props;

    const userInfo = useSelector(state => state.userReducer.userInfo);
    const dispatch = useDispatch();

    const selectedMenu = allConfigs.menuConfigs.getSelectedMenu();

    const renderMenuHeader = () =>
        headerMenu.map(menu => (
            <Menu.Item key={menu.id} className="menu-avatar-dropdown">
                <Link to={menu.link}>
                    {menu.icon}
                    <FormattedMessage id={menu.id} />
                </Link>
            </Menu.Item>
        ));
    const onClick = item => {
        allConfigs.menuConfigs.setSelectedMenu(item.key);
    };
    const onLogout = () => {
        dispatch(allActions.authenticatedActions.signout(history));
    }
    const menuHeaderDropdown = (
        <Menu
            style={{ minWidth: '160px' }}
            selectedKeys={[selectedMenu]}
            onClick={onClick}
        >
            {renderMenuHeader()}
            <Menu.Divider />
            <Menu.Item key="logout" onClick={onLogout}>
                <LogoutOutlined />
                <FormattedMessage id="globalHeader.logout" />
            </Menu.Item>
        </Menu>
    );

    return userInfo && userInfo.nickname ? (
        <HeaderDropdown overlay={menuHeaderDropdown} placement="bottomRight">
            <span className="dropDown-avatar">
                <Avatar
                    style={{ marginRight: '8px', backgroundColor: '#87d068' }}
                    className="avatar"
                    size="small"
                    icon={<UserOutlined />}
                    alt="avatar"
                />
                <span>{userInfo.nickname}</span>
            </span>
        </HeaderDropdown>
    ) : (
        <Spin
            size="small"
            style={{
                margin: '25px 0 0 20px',
                textAlign: 'center'
            }}
        />
    );
};
export default withRouter(AvatarDropdown);
