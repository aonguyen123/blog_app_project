import React from 'react';
import { Link } from 'react-router-dom';
import { formatMessage } from 'umi-plugin-react/locale';
import { List, Avatar } from 'antd';
import { ExtraContent } from 'components';
import ExtraFriend from './../ExtraFriend';

const { Item } = List;

export default function ItemFriend({friend, showCardUser, friends, cancelFriend}) {
    
    return (
        <Item key={friend._id} extra={<ExtraContent key='more' menu={ExtraFriend(showCardUser, friend._id, friends, cancelFriend)} />}>
            <Item.Meta
                avatar={<Avatar src={friend.photoURL} />}
                title={<Link to={`/profile/${friend._id}`}>{friend.displayName}</Link>}
                description={friends.findIndex(f => f.idUser._id === friend._id) !== -1 && formatMessage({id: 'home.friends.follow'})}
            />
        </Item>
    );
}
