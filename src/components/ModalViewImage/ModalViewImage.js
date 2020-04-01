import React from 'react';
import { Modal } from 'antd';

export default function ModalViewImage(props) {
    const { previewImage, previewVisible, handleCancel } = props;

    const handleCancelModal = () => {
        handleCancel();
    }

    return (
        <Modal visible={previewVisible} footer={null} onCancel={handleCancelModal}>
            <img alt="post" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    );
}
