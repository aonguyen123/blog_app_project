import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import LeftLogo from './LeftLogo';
import RightMenu from './RightMenu';
import HeaderSearch from './../HeaderSearch';
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
                    icon='menu' 
                    onClick={showDrawer} 
                    type='primary'
                />
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <RightMenu />
                </Drawer>
            </div>
        </nav>
    );
}
