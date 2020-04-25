import React from 'react';
import { Popconfirm } from 'antd';

export default function PopConfirm({children, title, okText, cancelText, placement}) {

    return (
        <Popconfirm
            title={title}
            okText={okText}
            cancelText={cancelText}
            placement={placement}
        >
            {children}
        </Popconfirm>
    )
}