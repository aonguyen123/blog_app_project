import React from 'react';
import AvatarList from 'ant-design-pro/lib/AvatarList';
import { TeamOutlined } from '@ant-design/icons';
import './styles.css';

export default function Friends({ friends }) {
    return (
        <div className='friends'>
            <div className='friend-title'><TeamOutlined /> Friends</div>
            <AvatarList size="default">
                {friends.map(value => (
                    <AvatarList.Item
                        key={value.idUser._id}
                        tips={value.idUser.displayName}
                        src={value.idUser.photoURL}
                    />
                ))}
            </AvatarList>
        </div>
    );
}
