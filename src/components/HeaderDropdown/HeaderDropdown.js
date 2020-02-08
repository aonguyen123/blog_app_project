import React from 'react';
import { Dropdown } from 'antd';

export default function HeaderDropdown(props) {
    const { ...rest } = props;

    return (
        <Dropdown {...rest} />
    )
}