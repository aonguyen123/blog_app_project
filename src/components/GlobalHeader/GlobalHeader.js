import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LeftLogo from './LeftLogo';
import RightMenu from './RightMenu';
import HeaderSearch from './../HeaderSearch';
import MenuReponsive from './MenuReponsive';
import NoticeIcon from './NoticeIcon';
import './styles.css';

export default function GlobalHeader() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <nav className="menuBar">
            <LeftLogo />
            <div className="menuCon">
                <div className="leftMenu">
                    <HeaderSearch />
                </div>
                <div className="rightMenu">
                    <RightMenu />
                </div>
                <Button 
                    className="barsMenu" 
                    icon={<MenuOutlined />}
                    onClick={showDrawer} 
                    type='primary'
                />
                <div className="repoMenu">
                    <NoticeIcon />
                </div>
                <Drawer
                    placement="right"
                    closable
                    onClose={onClose}
                    visible={visible}
                >
                    <MenuReponsive />
                </Drawer>
            </div>
        </nav>
    );
}
