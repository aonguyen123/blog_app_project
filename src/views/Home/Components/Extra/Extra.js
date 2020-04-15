import React from 'react';
import { Menu } from 'antd';

export default function Extra() {
    return (
        <Menu>
            <Menu.Item>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.alipay.com/"
                >
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.taobao.com/"
                >
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.tmall.com/"
                >
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );
}
