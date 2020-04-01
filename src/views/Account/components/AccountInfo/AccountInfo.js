import React from 'react';
import { Card, Divider } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, MailOutlined } from '@ant-design/icons';
import './styles.css';
import Interests from '../Interests/Interests';
import Skill from '../Skill/Skill';

export default function AccountInfo({userInfo, loadingFetchData}) {
    
    return (
        <Card
            style={{
                marginBottom: 24
            }}
            loading={loadingFetchData}
        >
            <div className="avatarHolder">
                <img
                    alt="avatar"
                    src={userInfo.avatar}
                />
                <div className="name">{userInfo.nickname}</div>
                <div>
                    {userInfo.description}
                </div>
            </div>
            <div className="detail">
                <p>
                    <PhoneOutlined className="icon-title" />
                    {userInfo.phonenumber}
                </p>
                <p>
                    <MailOutlined className="icon-title" />
                    {userInfo.email}
                </p>
                <p>
                    <EnvironmentOutlined className="icon-title" />
                    {`${userInfo.district} - ${userInfo.provinceOrCity}`}
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
