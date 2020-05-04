import React from 'react';
import { Popover } from 'antd';

export default function PopOver({
    children,
    placement,
    title, 
    content,
    trigger
}) {
    return (
        <Popover
            placement={placement}
            title={title}
            content={content}
            trigger={trigger}
        >
            {children}
        </Popover>
    );
}
