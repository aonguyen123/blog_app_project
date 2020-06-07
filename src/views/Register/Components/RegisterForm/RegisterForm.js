import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Tooltip, Button, Upload, message } from 'antd';
import {
    QuestionCircleOutlined,
    FormOutlined as RegisterIcon,
    UploadOutlined,
    MailOutlined,
    LockOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';
import allCommons from 'common';
import firebaseConfig from '../../../../firebase';
import { UploadImage } from 'components';
import './styles.css';

export default function RegisterForm({ loadingButton, onFinish }) {
    const [disable, setDisable] = useState(false);
    const [form] = Form.useForm();
    let uploadTask = useRef(null);

    useEffect(() => {
        return () => {
            if (uploadTask.current !== null) {
                uploadTask.current.cancel();
            }
        };
    }, []);

    const checkNickname = (rule, value) => {
        if (value) {
            value = value.trim();
            value = value.replace(/\s+/g, '');
            if (value.length < 5) {
                return Promise.reject(formatMessage({id: 'basicSetting.valid.minNickname'}));
            }
            return Promise.resolve();
        }
        return Promise.resolve();
    };
    const uploadButton = (
        <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
            {formatMessage({id: 'register.clickUpload'})}
        </Button>
    );
    const uploadSuccess = () => {
        setDisable(false);
    };
    const customRequest = option => {
        setDisable(true);
        const { onSuccess, onError, file, onProgress } = option;
        uploadTask.current = firebaseConfig.firebase.storage
            .ref(`/images/${file.name}`)
            .put(file);
        UploadImage.customRequest(
            onSuccess,
            onError,
            file,
            onProgress,
            uploadTask.current,
            uploadSuccess
        );
    };
    const onRemove = file => {
        setDisable(false);
        UploadImage.onRemove(file, uploadTask.current);
    };
    const normFile = ({ file, fileList }) => {
        const files = [];
        let newFileLists = [...fileList].filter(file =>
            allCommons.uploadCommon.filterFileUpload(file)
        );
        if (newFileLists.length !== 0) {
            files.push(newFileLists[newFileLists.length - 1]);
        }
        return files;
    };
    const handleFinish = async () => {
        const values = await form.validateFields();

        if (values.upload[0].status === 'uploading') {
            message.warning(formatMessage({id: 'register.uploadingAvatar'}), 3);
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
        >
            <Form.Item
                name="email"
                label="E-mail"
                hasFeedback
                rules={[
                    {
                        type: 'email',
                        message: formatMessage({id: 'basicSetting.valid.notEmail'})
                    },
                    {
                        required: true,
                        message: formatMessage({id: 'basicSetting.valid.email'})
                    }
                ]}
            >
                <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
                name="password"
                label={formatMessage({id: 'register.password'})}
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
                hasFeedback
                style={{
                    display: 'inline-block',
                    width: 'calc(50% - 12px)'
                }}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <span
                style={{
                    display: 'inline-block',
                    width: '24px',
                }}
            >
            </span>

            <Form.Item
                name="confirm"
                label={formatMessage({id: 'register.confirmPass'})}
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'security.setting.validComfirmPass'})
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                formatMessage({id: 'security.setting.matchComfirmPass'})
                            );
                        }
                    })
                ]}
                style={{
                    display: 'inline-block',
                    width: 'calc(50% - 12px)'
                }}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                hasFeedback
                name="nickname"
                label={
                    <span>
                        {formatMessage({id: 'register.nickname'})}&nbsp;
                        <Tooltip title={formatMessage({id: 'register.helpNickname'})}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'basicSetting.valid.nickname'})
                    },
                    {
                        whitespace: true,
                        message: formatMessage({id: 'basicSetting.valid.spaceNickname'})
                    },
                    {
                        max: 13,
                        message: formatMessage({id: 'basicSetting.valid.maxNickname'})
                    },
                    {
                        validator: checkNickname
                    }
                ]}
            >
                <Input prefix={<SmileOutlined />} />
            </Form.Item>

            <Form.Item
                label={formatMessage({id: 'register.upload'})}
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: true,
                        message: formatMessage({id: 'register.avatarRequire'})
                    }
                ]}
            >
                <Upload
                    {...UploadImage.propsUpload()}
                    customRequest={customRequest}
                    onRemove={onRemove}
                    disabled={disable}
                >
                    {uploadButton}
                </Upload>
            </Form.Item>

            <Form.Item>
                {formatMessage({id: 'register.textLoginHere'})} <Link to="/login">{formatMessage({id: 'register.here'})}</Link>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<RegisterIcon />}
                    block
                    loading={loadingButton}
                >
                    {formatMessage({id: 'register.title'})}
                </Button>
            </Form.Item>
        </Form>
    );
}
