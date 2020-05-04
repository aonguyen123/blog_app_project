import React from 'react';
import { Card, Divider } from 'antd';
import {
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined
} from '@ant-design/icons';
import './styles.css';
import Interests from '../Interests/Interests';
import Skill from '../Skill/Skill';

export default function AccountInfo({ userInfo, userCurrentId }) {
    
    return (
        <Card
            style={{
                marginBottom: 24
            }}
        >
            <div className="avatarHolder">
                <img alt="avatar" src={userInfo.photoURL} />
                <div className="name">{userInfo.displayName}</div>
                <div>{userInfo.description}</div>
            </div>
            <div className="detail">
                <p>
                    <MailOutlined className="icon-title" />
                    {userInfo.email}
                </p>
                {userInfo.phonenumber && (
                    <p>
                        <PhoneOutlined className="icon-title" />
                        {userInfo.phonenumber}
                    </p>
                )}
                {userInfo.district && userInfo.provinceOrCity && (
                    <p>
                        <EnvironmentOutlined className="icon-title" />
                        {`${userInfo.district} - ${userInfo.provinceOrCity}`}
                    </p>
                )}
            </div>
            <Divider dashed />
            <Interests idUser={userInfo._id} userCurrentId={userCurrentId} />
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
