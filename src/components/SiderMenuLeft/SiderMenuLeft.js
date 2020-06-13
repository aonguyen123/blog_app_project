import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { siderMenu } from '../../constants/sider-menu';
import allActions from 'actions';

export default function SiderMenuLeft({ collapsedWidth }) {
    const isBreak = useSelector(state => state.uiReducer.isBreak);
    const dispatch = useDispatch();

    const resize = useCallback(() => {
        if(window.innerWidth <= 767) {
            dispatch(allActions.uiActions.changeBreak(true));
        } else {
            dispatch(allActions.uiActions.changeBreak(false));
        }
    }, [dispatch]);
    useEffect(() => {
        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [resize]);

    const renderSiderMenu = () => {
        return siderMenu.map(menu => {
            return (
                <Menu.Item key={menu.id}>
                    <NavLink to={menu.link} activeStyle={{ color: '#1890FF' }}>
                        {menu.icon}
                        <FormattedMessage id={menu.id} />
                    </NavLink>
                </Menu.Item>
            );
        });
    };

    return (
        <Menu theme={collapsedWidth ? 'dark' : 'light'} mode="inline">
            {isBreak && (
                <Menu.Item key='menu.friend'>
                    <NavLink to='/friends' activeStyle={{ color: '#1890FF' }}>
                        <TeamOutlined />
                        <FormattedMessage id='menu.friend' />
                    </NavLink>
                </Menu.Item>
            )}

            {renderSiderMenu()}
        </Menu>
    );
}
