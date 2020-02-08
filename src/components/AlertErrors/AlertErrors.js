import React from 'react';
import { Alert } from 'antd';

export default function AlertErrors(props) {
    const { ...rest } = props;
    return (
        <Alert
            {...rest}
            showIcon
            closable
            onClose={e => {
                return e;
            }}
            style={{marginBottom: 24}}
        />
    );
}
