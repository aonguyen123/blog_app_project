import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export default function ConfirmEvent(idEvent, confirmEvent) {

    return confirm({
        title: 'Do you want to make friend?',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
            await confirmEvent(idEvent);
        },
        onCancel() {},
    });
}
