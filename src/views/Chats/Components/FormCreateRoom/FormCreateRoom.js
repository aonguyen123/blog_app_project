import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined, ProfileOutlined, LockOutlined } from '@ant-design/icons';
import { UploadImage } from './../../../../components';
import allCommons from '../../../../common';
import firebaseConfig from '../../../../firebase';
import './styles.css';
const { Item } = Form;

export default function FormCreateRoom({form, visible}) {
    const [disable, setDisable] = useState(false);
    const uploadTask = useRef(null);

    useEffect(() => {
        if (!visible && uploadTask.current !== null) {
            uploadTask.current.cancel();
            setDisable(false);
        }
    }, [visible]);

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 12}
    };
    const uploadButton = (
        <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
            Click to upload
        </Button>
    );
    const normFile = ({ file, fileList }) => {
        const files = [];
        let newFileLists = [...fileList].filter(file =>
            allCommons.uploadCommon.filterFileUpload(file)
        );
        if(newFileLists.length !== 0)
        {
            if(newFileLists[0].status === 'error') {
                return file = [];
            }
            files.push(newFileLists[newFileLists.length - 1]);
        }
        return files;
    };
    const uploadSuccess = () => {
        setDisable(false);
    }
    const customRequest = option => {
        setDisable(true);
        const { onSuccess, onError, file, onProgress } = option;
        uploadTask.current = firebaseConfig.firebase.storage
        .ref(`/images/${file.name}`)
        .put(file);
        UploadImage.customRequest(onSuccess, onError, file, onProgress, uploadTask.current, uploadSuccess);
    };
    const onRemove = file => {
        setDisable(false);
        UploadImage.onRemove(file, uploadTask.current);
    };

    return (
        <Form
            form={form}
            {...layout}
            name="createRoom"
        >
            <Item
                label="Room name"
                name="roomName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your room name'
                    },
                    {
                        max: 20,
                        message: 'Room name not too 20 character'
                    },
                    {
                        min: 5,
                        message: 'Room name at least 5 character'
                    }
                ]}
            >
                <Input prefix={<ProfileOutlined />} placeholder='Room name' />
            </Item>
            <Item
                label="Room avatar"
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
                    disabled={disable}
                >
                    {uploadButton}
                </Upload>
            </Item>
            <Item
                label="Password"
                name="password"
            >
                <Input.Password prefix={<LockOutlined />} placeholder='Password' />
            </Item>
        </Form>
    );
}
