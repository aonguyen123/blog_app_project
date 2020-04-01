import React from 'react';
import { Divider } from 'antd';
import './styles.css';

export default function SearchBox() {

    return (
        <div className="header-search">
            <Divider
                type="vertical"
                style={{ height: '35px', marginLeft: 0 }}
            />
        </div>
    );
}
