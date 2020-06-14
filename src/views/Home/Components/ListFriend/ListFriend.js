import React from 'react';
import { List } from 'antd';
import ItemFriend from './../ItemFriend';
import './styles.css';

export default function ListFriend({ searchUsers, showCardUser, friends, cancelFriend }) {
    return (
        <div className="list-friend-container">
            <List
                dataSource={searchUsers.length === 0 ? friends : searchUsers}
                renderItem={item => (
                    <ItemFriend
                        friend={searchUsers.length === 0 ? item.idUser : item}
                        showCardUser={showCardUser}
                        friends={friends}
                        cancelFriend={cancelFriend}
                    />
                )}
            />
        </div>
    );
}
