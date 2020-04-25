import React, { useState, useCallback } from 'react';
import { List, Form } from 'antd';
import FormChangePass from '../FormChangePass';
import ListSetting from './../ListSetting';
import { ModalContent } from './../../../../components';

export default function SercurityList(props) {
    const [value, setValue] = useState({
        visible: false,
        confirmLoading: false
    });
    const [form] = Form.useForm();

    const showModal = () => {
        setValue({
            ...value,
            visible: true
        });
    };
    const handleCancel = () => {
        setValue({
            ...value,
            visible: false
        });
    };

    // const prevVisibleRef = useRef();

    // useEffect(() => {
    //     prevVisibleRef.current = visible;
    // }, [visible]);
    // const prevVisible = prevVisibleRef.current;
    // useEffect(() => {
    //     if (!visible && prevVisible) {
    //         form.resetFields();
    //     }
    // }, [visible, form, prevVisible]);

    
    const handleOk = useCallback(() => {
        form.submit();
    }, [form]);
    const onFormFinish = (name, { values, forms }) => {
        if (name === 'changePasswordForm') {
            //const { current_password, new_password, password_confirm } = values;
            setValue({
                ...value,
                visible: false,
                confirmLoading: false
            });
        }
    }

    return (
        <Form.Provider onFormFinish={onFormFinish}>
            <List
                itemLayout="horizontal"
                dataSource={ListSetting(showModal)}
                renderItem={item => (
                    <List.Item actions={[item.action]}>
                        <List.Item.Meta
                            title={item.name}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <ModalContent
                title='Change the password'
                visible={value.visible}
                handleCancel={handleCancel}
                handleOk={handleOk}
                confirmLoading={value.confirmLoading}
                content={<FormChangePass form={form} />}
            />
        </Form.Provider>
    );
}
