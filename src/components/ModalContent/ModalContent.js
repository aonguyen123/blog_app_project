import React from 'react';
import { Modal } from 'antd';

export default function ModalContent({
    visible,
    handleCancel,
    handleOk,
    confirmLoading,
    content,
    title
}) {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {content}
        </Modal>
    );
}
