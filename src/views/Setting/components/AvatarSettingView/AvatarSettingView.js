import React, { useRef, useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Row, Col } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import allCommons from 'common';
import { UploadImage } from 'components';
import firebaseConfig from './../../../../firebase';
import './styles.css';

export default function AvatarSettingView({ photo, updatePhotoURL }) {
    const [disable, setDisable] = useState(false);
    const [fileList, setFileList] = useState([]);
    let uploadTask = useRef(null);
    const unmounted = useRef(false);

    useEffect(() => {
        return () => {
            if(uploadTask.current !== null) {
                unmounted.current = true;
                uploadTask.current.cancel();
            }
        };
    }, []);

    const propsUpload = {
        beforeUpload: file => {
            if (!allCommons.uploadCommon.beforeUpload(file)) {
                return false;
            }
        }
    };
    const uploadSuccess = file => {
        setDisable(false);
        updatePhotoURL(file);
    };
    const customRequest = options => {
        setDisable(true);
        
        const { onSuccess, onError, file, onProgress } = options;
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
    const onChange = ({ fileList }) => {
        if (fileList.length > 1) {
            fileList.splice(0, 1);
        }
        if(!unmounted.current) {
            setFileList([...fileList]);
        }
    };

    return (
        <div>
            <Row type="flex" justify="center">
                <Col>
                    <div className="avatar_title">{formatMessage({id: 'setting.basicSetting.avatar'})}</div>
                    <div className="avatar-setting">
                        <img src={photo} alt="avatar" />
                    </div>
                    <Upload
                        {...propsUpload}
                        customRequest={customRequest}
                        disabled={disable}
                        fileList={fileList}
                        onChange={onChange}
                        showUploadList={{ showRemoveIcon: false }}
                    >
                        <div className="button_view-setting">
                            <Button>
                                <UploadOutlined />
                                {formatMessage({id: 'setting.basicSetting.changeAvatar'})}
                            </Button>
                        </div>
                    </Upload>
                </Col>
            </Row>
        </div>
    );
}
