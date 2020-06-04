import React from 'react';
import { Card, Affix } from 'antd';
import SearchBox from './../SearchBox';
import ListFriend from './../ListFriend';

export default function Friend({
    searchUser,
    loadingData,
    searchUsers,
    searchEmpty,
    showCardUser,
    friends
}) {
    
    return (
        <Affix>
            <Card title='Friends' size='small'>
                <SearchBox
                    searchUser={searchUser}
                    loadingData={loadingData}
                    searchEmpty={searchEmpty}
                />
                <ListFriend
                    searchUsers={searchUsers}
                    showCardUser={showCardUser}
                    friends={friends}
                />
            </Card>
        </Affix>
    );
}
