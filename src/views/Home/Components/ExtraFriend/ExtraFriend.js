import React from 'react';
import { Menu } from 'antd';

export default function ExtraFriend(showCardUser, idFriend) {

    return (
        <Menu>
            <Menu.Item onClick={() => showCardUser(idFriend)}>
                View detail
            </Menu.Item>
        </Menu>
    );
}
