import React from 'react';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import { Divider } from 'antd';
import './styles.css';

export default function SearchBox() {

    return (
        <div className="header-search">
            <Divider
                type="vertical"
                style={{ height: '35px', marginLeft: 0 }}
            />
            <HeaderSearch
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={value => {
                    console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={value => {
                    console.log('enter', value); // eslint-disable-line
                }}
            />
        </div>
    );
}
