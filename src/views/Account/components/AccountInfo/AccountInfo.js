import React from 'react';
import { Card, Divider } from 'antd';
import {
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined
} from '@ant-design/icons';
import './styles.css';
import Interests from '../Interests/Interests';

export default function AccountInfo({
    userInfo,
    userCurrentId,
    createInterest,
    removeInterest
}) {
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
                        {`+84${userInfo.phonenumber}`}
                    </p>
                )}
                {userInfo.district && userInfo.provinceOrCity && (
                    <p>
                        <EnvironmentOutlined className="icon-title" />
                        {`${userInfo.district.label} - ${userInfo.provinceOrCity.label}`}
                    </p>
                )}
            </div>
            <Divider dashed />
            <Interests
                idUser={userInfo._id}
                userCurrentId={userCurrentId}
                createInterest={createInterest}
                removeInterest={removeInterest}
                interests={userInfo.interests}
            />
        </Card>
    );
}
