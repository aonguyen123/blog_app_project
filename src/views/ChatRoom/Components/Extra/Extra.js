import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

export default function Extra(idCur, idUser) {
    return (
        <Menu>
            <Menu.Item>
                <Link to={idCur === idUser ? '/account' : `/profile/${idUser}`}>
                    {formatMessage({id: 'chatroom.viewProfile'})}
                </Link>
            </Menu.Item>
        </Menu>
    );
}
