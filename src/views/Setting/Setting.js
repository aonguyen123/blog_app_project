import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { useSelector } from 'react-redux';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import { BasicSetting, SercuritySetting } from './components';
import './styles.css';

const { Item } = Menu;
const menuMap = {
    base: formatMessage({id: 'setting.basicSetting.title'}),
    security: formatMessage({id: 'security.setting.title'}),
};

export default function Setting() {
    const [selectKey, setSelectKey] = useState('base');
    const [mode, setMode] = useState('horizontal');
    const userInfo = useSelector(state => state.userReducer.userInfo);
    let auto = undefined;

    const getMenu = () => {
        return Object.keys(menuMap).map(item => (
            <Item key={item}>{menuMap[item]}</Item>
        ));
    };
    const getRightTitle = () => {
        return menuMap[selectKey];
    };
    const renderChildren = () => {
        switch (selectKey) {
            case 'base':
                return <BasicSetting userInfo={userInfo} />;
            case 'security':
                return <SercuritySetting />;
            default:
                break;
        }
        return null;
    };
    const selectedKey = key => {
        setSelectKey(key);
    };
    const resize = () => {
        if (!auto) {
            return;
        }
        requestAnimationFrame(() => {
            if (!auto) {
                return;
            }
            let mode = 'horizontal';
            if (window.innerWidth < 641) {
                mode = 'inline';
            }
            setMode(mode);
        });
    };
    useEffect(() => {
        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        };
    });

    return (
        <GridContent>
            <div className="main" ref={ref => (auto = ref)}>
                <div className="leftMenu-account">
                    <Menu
                        mode={mode}
                        selectedKeys={[selectKey]}
                        onClick={({ key }) => selectedKey(key)}
                    >
                        {getMenu()}
                    </Menu>
                </div>
                <div className="right-account">
                    <div className="title">{getRightTitle()}</div>
                    {renderChildren()}
                </div>
            </div>
        </GridContent>
    );
}
