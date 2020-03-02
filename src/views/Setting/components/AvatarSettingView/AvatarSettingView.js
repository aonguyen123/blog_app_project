import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Row, Col } from 'antd';
import './styles.css';

export default function AvatarSettingView() {
    return (
        <div>
            <Row type="flex" justify="center">
                <Col>
                    <div className="avatar_title">Avatar</div>
                    <div className="avatar-setting">
                        <img
                            src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
                            alt="avatar"
                        />
                    </div>
                    <Upload showUploadList={false}>
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
