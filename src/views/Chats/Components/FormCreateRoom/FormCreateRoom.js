import React, { useState } from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadImage } from './../../../../components';
import allCommons from '../../../../common';
import firebaseConfig from '../../../../firebase';
import './styles.css';
const { Item } = Form;

let uploadTask;
export default function FormCreateRoom({form}) {
    const [disable, setDisable] = useState(false);

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 }
    };
    const uploadButton = (
        <Button style={{ width: '100%' }} icon={<UploadOutlined />} disabled={disable}>
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
            files.push(newFileLists[newFileLists.length - 1]);
        }
        return files;
    };
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

    return (
        <Form
            form={form}
            {...formItemLayout}
            layout="horizontal"
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
                <Input />
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
                >
                    {uploadButton}
                </Upload>
            </Item>
            <Item
                label="Password"
                name="password"
            >
                <Input.Password />
            </Item>
        </Form>
    );
}
