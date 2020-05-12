import React from 'react';
import { Modal } from 'antd';

export default function ModalContent({
    visible,
    handleCancel,
    handleOk,
    confirmLoading,
    content,
    title,
    width
}) {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={width}
        >
            {content}
        </Modal>
    );
}
