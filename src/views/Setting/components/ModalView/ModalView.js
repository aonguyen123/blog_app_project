import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input } from 'antd';
const { Item } = Form;

export default function ModalView(props) {
    const { visible, handleCancel } = props;
    const [form] = Form.useForm();
    const prevVisibleRef = useRef();

    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible, form, prevVisible]);

    const handleOkModal = () => {
        form.submit();
    };
    const handleCancelModal = () => {
        handleCancel();
    };
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 }
    };

    return (
        <Modal
            visible={visible}
            title="Change the password"
            onOk={handleOkModal}
            onCancel={handleCancelModal}
        >
            <Form
                form={form}
                {...formItemLayout}
                layout="horizontal"
                name='changePasswordForm'
            >
                <Item
                    label="Current Password"
                    name="current_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password'
                        }
                    ]}
                >
                    <Input />
                </Item>
                <Item
                    label="New Password"
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password'
                        }
                    ]}
                >
                    <Input />
                </Item>
                <Item
                    label="Password Comfirm"
                    name="password_comfirm"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password'
                        }
                    ]}
                >
                    <Input />
                </Item>
            </Form>
        </Modal>
    );
}
