import React from 'react';
import { Menu } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

export default function ExtraFriend(showCardUser, idFriend) {

    return (
        <Menu>
            <Menu.Item onClick={() => showCardUser(idFriend)}>
                {formatMessage({id: 'home.friends.viewDetail'})}
            </Menu.Item>
        </Menu>
    );
}
