import React from 'react';
import { Divider } from 'antd';
import AvatarList from 'ant-design-pro/lib/AvatarList';

export default function Interactive({ likes, dislikes }) {
    return (
        <div>
            {likes?.length > 0 && <Divider orientation="left">Liked</Divider>}
            <AvatarList size="small">
                {likes?.map(value => (
                    <AvatarList.Item
                        key={value._id}
                        tips={value.idUser.displayName}
                        src={value.idUser.photoURL}
                    />
                ))}
            </AvatarList>
            {dislikes?.length > 0 && <Divider orientation="left">Disliked</Divider>}
            <AvatarList size="small">
                {dislikes?.map(value => (
                    <AvatarList.Item
                        key={value._id}
                        tips={value.idUser.displayName}
                        src={value.idUser.photoURL}
                    />
                ))}
            </AvatarList>
        </div>
    );
}
