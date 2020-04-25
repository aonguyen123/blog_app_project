import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Tooltip, Button, Upload, message } from 'antd';
import {
    QuestionCircleOutlined,
    FormOutlined as RegisterIcon,
    UploadOutlined
} from '@ant-design/icons';
import allCommons from '../../../../common';
import firebaseConfig from '../../../../firebase';
import { UploadImage } from './../../../../components';
import './styles.css';

let uploadTask;
export default function RegisterForm({ loadingButton, onFinish }) {
    const [disable, setDisable] = useState(false);
    const [form] = Form.useForm();

    const checkNickname = (rule, value) => {
        if (value) {
            value = value.trim();
            value = value.replace(/\s+/g, '');
            if (value.length < 5) {
                return Promise.reject('Nickname of at least 5 characters');
            }
            return Promise.resolve();
        }
        return Promise.resolve();
    };
    const uploadButton = (
        <Button style={{ width: '100%' }} icon={<UploadOutlined />} disabled={disable}>
            Click to upload
        </Button>
    );
    const uploadSuccess = () => {
        setDisable(false);
    }
    const customRequest = option => {
        setDisable(disable => !disable);
        const { onSuccess, onError, file, onProgress } = option;
        uploadTask = firebaseConfig.firebase.storage
        .ref(`/images/${file.name}`)
        .put(file);
        UploadImage.customRequest(onSuccess, onError, file, onProgress, uploadTask, uploadSuccess);
    };
    const onRemove = file => {
        setDisable(false);
        UploadImage.onRemove(file, uploadTask);
    };
    const normFile = ({ file, fileList }) => {
        const files = [];
        let newFileLists = [...fileList].filter(file =>
            allCommons.uploadCommon.filterFileUpload(file)
        );
        if(newFileLists.length !== 0)
        {
            files.push(newFileLists[newFileLists.length - 1]);
        }
        return files;
    };
    const handleFinish = async () => {
        const values = await form.validateFields();

        if (values.upload[0].status === 'uploading') {
            message.warning('Uploading photo, plase wait !!!', 3);
        } else {
            onFinish(values);
        }
    };

    return (
        <Form
            layout="vertical"
            name="register"
            form={form}
            onFinish={handleFinish}
            scrollToFirstError
            initialValues={{
                gender: 'Nam'
            }}
        >
            <Form.Item
                name="email"
                label="E-mail"
                hasFeedback
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    },
                    {
                        min: 6,
                        message: 'Password must be more than 6 characters'
                    }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                'The two passwords that you entered do not match!'
                            );
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                hasFeedback
                name="nickname"
                label={
                    <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!'
                    },
                    {
                        whitespace: true,
                        message: 'Nickname does not whitespace'
                    },
                    {
                        max: 15,
                        message: 'Nickname cannot exceed 15 characters'
                    },
                    {
                        min: 5,
                        message: 'Nickname at least 5 character'
                    },
                    {
                        validator: checkNickname
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Upload avatar"
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: true,
                        message: 'Photo is required'
                    }
                ]}
            >
                <Upload
                    {...UploadImage.propsUpload()}
                    customRequest={customRequest}
                    onRemove={onRemove}
                >
                    {uploadButton}
                </Upload>
            </Form.Item>

            <Form.Item>
                You have a account, login here <Link to="/login">login</Link>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<RegisterIcon />}
                    loading={loadingButton}
                >
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}
