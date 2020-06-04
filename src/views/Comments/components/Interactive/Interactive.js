import React from 'react';
import { Divider } from 'antd';
import AvatarList from 'ant-design-pro/lib/AvatarList';

export default function Interactive({ likes, dislikes }) {
    return (
        <div>
            {likes?.length > 0 && (
                <>
                    <Divider orientation="left" plain>
                        Liked
                    </Divider>
                    <AvatarList size="default">
                        {likes.map(value => (
                            <AvatarList.Item
                                key={value._id}
                                tips={value.idUser.displayName}
                                src={value.idUser.photoURL}
                            />
                        ))}
                    </AvatarList>
                </>
            )}
            {dislikes?.length > 0 && (
                <>
                    <Divider orientation="left" plain>
                        Disliked
                    </Divider>
                    <AvatarList size="default">
                        {dislikes.map(value => (
                            <AvatarList.Item
                                key={value._id}
                                tips={value.idUser.displayName}
                                src={value.idUser.photoURL}
                            />
                        ))}
                    </AvatarList>
                </>
            )}
        </div>
    );
}
