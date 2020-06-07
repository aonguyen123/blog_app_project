import React from 'react';
import { Form, Input } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
const { Item } = Form;

export default function FormChangePass({ form }) {
    const layout = {
        labelCol: {span: 9},
        wrapperCol: {span: 12}
    };

    return (
        <Form form={form} {...layout} name="changePasswordForm">
            <Item
                label={formatMessage({id: 'security.setting.currentPass'})}
                name="current_password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'security.setting.validPass'})
                    },
                    {
                        min: 6,
                        message: formatMessage({id: 'security.setting.minPass'})
                    }
                ]}
            >
                <Input.Password />
            </Item>
            <Item
                label={formatMessage({id: 'security.setting.newPass'})}
                name="new_password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'security.setting.validNewPass'})
                    },
                    {
                        min: 6,
                        message: formatMessage({id: 'security.setting.minPass'})
                    }
                ]}
            >
                <Input.Password />
            </Item>
            <Item
                label={formatMessage({id: 'security.setting.comfirmPass'})}
                name="password_comfirm"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'security.setting.validComfirmPass'})
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                !value ||
                                getFieldValue('new_password') === value
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(formatMessage({id: 'security.setting.matchComfirmPass'}));
                        }
                    })
                ]}
            >
                <Input.Password />
            </Item>
        </Form>
    );
}
