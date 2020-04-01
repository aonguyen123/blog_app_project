import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

export default function ExtraContent() {

    const menu = (
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

    return (
        <Dropdown key="more" overlay={menu}>
            <Button
                style={{
                    border: 'none',
                    padding: 0
                }}
            >
                <EllipsisOutlined
                    style={{
                        fontSize: 20,
                        verticalAlign: 'top'
                    }}
                />
            </Button>
        </Dropdown>
    );
}
