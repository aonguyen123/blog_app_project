import React from 'react';
import { Menu } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

export default function ExtraFriend(showCardUser, idFriend, friends, cancelFriend) {

    return (
        <Menu>
            <Menu.Item onClick={() => showCardUser(idFriend)}>
                {formatMessage({ id: 'home.friends.viewDetail' })}
            </Menu.Item>
            {friends.findIndex(friend => friend.idUser._id === idFriend) !==
                -1 && (
                <Menu.Item onClick={() => cancelFriend(idFriend)}>
                    {formatMessage({ id: 'home.friends.cancelFriend' })}
                </Menu.Item>
            )}
        </Menu>
    );
}
