import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';

const { confirm } = Modal;

export default function ConfirmEvent(idEvent, confirmEvent, onCancel) {

    return confirm({
        title: formatMessage({id: 'notification.confirm'}),
        icon: <ExclamationCircleOutlined />,
        async onOk() {
            await confirmEvent(idEvent);
        },
        async onCancel() {
            await onCancel(idEvent);
        },
        cancelText: formatMessage({id: 'notification.confirm.cancel'})
    });
}
