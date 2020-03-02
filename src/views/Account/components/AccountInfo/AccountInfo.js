import React from 'react';
import { Card, Divider } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, MailOutlined } from '@ant-design/icons';
import './styles.css';
import Interests from '../Interests/Interests';
import Skill from '../Skill/Skill';

export default function AccountInfo() {

    return (
        <Card
            style={{
                marginBottom: 24
            }}
            //loading={dataLoading}
        >
            <div className="avatarHolder">
                <img
                    alt="avatar"
                    src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
                />
                <div className="name">ao nguyen</div>
                <div>
                    muốn thành công phải trải qua nhìu thất bại. Trên đường đời
                    có dại mới có khôn
                </div>
            </div>
            <div className="detail">
                <p>
                    <PhoneOutlined className="icon-title" />
                    90890867676
                </p>
                <p>
                    <MailOutlined className="icon-title" />
                    aonguyen@gmail.comg
                </p>
                <p>
                    <EnvironmentOutlined className="icon-title" />
                    phu hung binh tan tay son binh dinh
                </p>
            </div>
            <Divider dashed />
            <Interests />
            <Divider
                style={{
                    marginTop: 16
                }}
                dashed
            />
            <Skill />
        </Card>
    );
}
