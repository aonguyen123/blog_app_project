import React from 'react';
import { List } from 'antd';
import ItemFriend from './../ItemFriend';
import './styles.css';

export default function ListFriend({
    searchUsers,
    showCardUser,
    friends,
    cancelFriend,
    isSearchUser
}) {
    return (
        <div className="list-friend-container">
            <List
                dataSource={
                    isSearchUser ? searchUsers : friends
                }
                renderItem={item => (
                    <ItemFriend
                        friend={isSearchUser ? item : item.idUser}
                        showCardUser={showCardUser}
                        friends={friends}
                        cancelFriend={cancelFriend}
                    />
                )}
            />
        </div>
    );
}
