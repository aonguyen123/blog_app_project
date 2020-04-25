import React from 'react';
import { Modal } from 'antd';

export default function ModalViewImage(props) {
    const { previewImage, previewVisible, handleCancel } = props;

    return (
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="post" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    );
}
