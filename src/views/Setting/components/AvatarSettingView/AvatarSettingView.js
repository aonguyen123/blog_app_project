import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Row, Col } from 'antd';
import allCommons from './../../../../common';
import allConfigs from './../../../../config';
import { BASE_URI } from './../../../../constants/base_url';
import './styles.css';

export default function AvatarSettingView({userInfo}) {
    
    const propsUpload = {
        beforeUpload: file => {
            allCommons.uploadCommon.beforeUpload(file);
        },
        action: `${BASE_URI}/user/upload-avatar`,
        headers: {
            'x-access-token': allConfigs.tokenConfigs.getToken().accessToken
        }
    };
    return (
        <div>
            <Row type="flex" justify="center">
                <Col>
                    <div className="avatar_title">Avatar</div>
                    <div className="avatar-setting">
                        <img
                            src={userInfo.avatar}
                            alt="avatar"
                        />
                    </div>
                    <Upload {...propsUpload}>
                        <div className="button_view-setting">
                            <Button>
                                <UploadOutlined />
                                Change avatar
                            </Button>
                        </div>
                    </Upload>
                </Col>
            </Row>
        </div>
    );
}
