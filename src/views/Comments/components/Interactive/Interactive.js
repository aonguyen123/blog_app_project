import React from 'react';
import { Divider } from 'antd';
import AvatarList from 'ant-design-pro/lib/AvatarList';
import { formatMessage } from 'umi-plugin-react/locale';

export default function Interactive({ likes, dislikes }) {
    return (
        <div>
            {likes?.length > 0 && (
                <>
                    <Divider orientation="left" plain>
                        {formatMessage({id: 'comment.liked'})}
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
                        {formatMessage({id: 'comment.disliked'})}
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
