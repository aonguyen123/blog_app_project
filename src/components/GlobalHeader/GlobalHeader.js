import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LeftLogo from './LeftLogo';
import RightMenu from './RightMenu';
import MenuReponsive from './MenuReponsive';
import NoticeIconView from './NoticeIcon';
import './styles.css';

export default function GlobalHeader() {
    const [visible, setVisible] = useState(false);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const events = useSelector(state => state.eventReducer.events);
    const loadingEvent = useSelector(state => state.uiReducer.loadingFetchEvent);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <nav
            className="menu"
            style={{ position: 'absolute', zIndex: 1, width: '100%' }}
        >
            <LeftLogo />
            <div className="menuCon">
                <div className="rightMenu">
                    <RightMenu userCurrent={userCurrent} events={events} loadingEvent={loadingEvent} />
                </div>
                <Button
                    className="barsMenu"
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                    type="primary"
                />
                <div className="repoMenu">
                    <NoticeIconView events={events} loadingEvent={loadingEvent} />
                </div>
                <Drawer
                    placement="right"
                    closable
                    onClose={onClose}
                    visible={visible}
                    key="menu-responsize"
                >
                    <MenuReponsive />
                </Drawer>
            </div>
        </nav>
    );
}
