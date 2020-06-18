import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from './../Home/Components/Friend';
import CardFlowUser from './../Home/Components/CardFlowUser';
import allActions from 'actions';
import Context from 'context';

export default function Friends() {
    const [idFriend, setIdFriend] = useState('');
    const loadingData = useSelector(state => state.uiReducer.loadingData);
    const searchUsers = useSelector(state => state.userReducer.searchUsers);
    const isSearchUser = useSelector(state => state.userReducer.isSearchUser);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const visible = useSelector(state => state.uiReducer.visible);
    const { socketRef } = useContext(Context);
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
    const cancelFriend = idFriend => {
        socketRef.current.emit('cancelFriend', {idFriend, idUser: userCurrent._id}, (idFriend) => {
            dispatch(allActions.eventsActions.unFriend(idFriend));
        });
    };

    return (
        <>
            <Friend
                searchUser={searchUser}
                showCardUser={showCardUser}
                loadingData={loadingData}
                searchUsers={searchUsers}
                friends={userCurrent.friends}
                isSearchUser={isSearchUser}
                searchEmpty={searchEmpty}
                cancelFriend={cancelFriend}
            />
            {visible && (
                <CardFlowUser
                    visible={visible}
                    onCancelFlowUser={onCancelFlowUser}
                    idFriend={idFriend}
                    userCurrent={userCurrent}
                    socketRef={socketRef}
                />
            )}
        </>
    );
}
