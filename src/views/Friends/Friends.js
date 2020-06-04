import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from './../Home/Components/Friend';
import CardFlowUser from './../Home/Components/CardFlowUser';
import allActions from 'actions';

export default function Friends() {
    const [idFriend, setIdFriend] = useState('');
    const loadingData = useSelector(state => state.uiReducer.loadingData);
    const searchUsers = useSelector(state => state.userReducer.searchUsers);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const visible = useSelector(state => state.uiReducer.visible);
    const dispatch = useDispatch();

    const searchUser = value => {
        dispatch(allActions.userActions.searchUser(value, userCurrent._id));
    };
    const showCardUser = idFriend => {
        setIdFriend(idFriend);
        dispatch(allActions.uiActions.changeVisible(true));
    };
    const searchEmpty = () => {
        dispatch(allActions.userActions.searchUserEmpty());
    };
    const onCancelFlowUser = () => {
        dispatch(allActions.uiActions.changeVisible(false));
    };

    return (
        <>
            <Friend
                searchUser={searchUser}
                showCardUser={showCardUser}
                loadingData={loadingData}
                searchUsers={searchUsers}
                friends={userCurrent.friends}
                searchEmpty={searchEmpty}
            />
            {visible && (
                <CardFlowUser
                    visible={visible}
                    onCancelFlowUser={onCancelFlowUser}
                    idFriend={idFriend}
                    userCurrent={userCurrent}
                />
            )}
        </>
    );
}
