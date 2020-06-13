import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Affix } from 'antd';
import {
    ToolPost,
    ListContent,
    Friend,
    CardFlowUser,
} from './Components';
import { Banner } from 'components';
import allActions from 'actions';

export default function Home() {
    const [idFriend, setIdFriend] = useState('');
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const posts = useSelector(state => state.postReducer.posts);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const mentions = useSelector(state => state.postReducer.mentions);
    const loadingFetchData = useSelector(
        state => state.uiReducer.loadingFetchData
    );
    const loadingData = useSelector(state => state.uiReducer.loadingData);
    const visible = useSelector(state => state.uiReducer.visible);
    const searchResult = useSelector(state => state.userReducer.searchMentions);
    const hasMorePosts = useSelector(state => state.postReducer.hasMoreItems);
    const nextPage = useSelector(state => state.postReducer.nextPage);
    const searchUsers = useSelector(state => state.userReducer.searchUsers);
    const isBreak = useSelector(state => state.uiReducer.isBreak);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.postActions.fetchPost(1, 10, userCurrent._id));
        return () => {
            dispatch(allActions.postActions.unmountPostById());
        };
    }, [dispatch, userCurrent._id]);

    const likePostHome = useCallback(
        idPost => {
            dispatch(allActions.postActions.likePost(userCurrent._id, idPost));
        },
        [dispatch, userCurrent._id]
    );
    const dislikePostHome = useCallback(
        idPost => {
            dispatch(
                allActions.postActions.dislikePost(userCurrent._id, idPost)
            );
        },
        [dispatch, userCurrent._id]
    );
    const searchUser = useCallback(
        value => {
            dispatch(allActions.userActions.searchUser(value, userCurrent._id));
        },
        [dispatch, userCurrent._id]
    );
    const searchEmpty = useCallback(() => {
        dispatch(allActions.userActions.searchUserEmpty());
    }, [dispatch]);
    const showCardUser = useCallback(
        idFriend => {
            setIdFriend(idFriend);
            dispatch(allActions.uiActions.changeVisible(true));
        },
        [dispatch]
    );
    const onCancelFlowUser = useCallback(() => {
        dispatch(allActions.uiActions.changeVisible(false));
    }, [dispatch]);
    const deletePost = useCallback(idPost => {
        dispatch(allActions.postActions.deletePostById(idPost));
    },[dispatch]);

    const ListContentMemo = useMemo(
        () => (
            <ListContent
                posts={posts}
                idUser={userCurrent._id}
                hasMorePosts={hasMorePosts}
                nextPage={nextPage}
                loadingFetchData={loadingFetchData}
                likePostHome={likePostHome}
                dislikePostHome={dislikePostHome}
                deletePost={deletePost}
            />
        ),
        [
            posts,
            userCurrent._id,
            hasMorePosts,
            nextPage,
            loadingFetchData,
            likePostHome,
            dislikePostHome,
            deletePost
        ]
    );
    const ToolPostMemo = useMemo(
        () => (
            <ToolPost
                userCurrent={userCurrent}
                loadingButton={loadingButton}
                mentions={mentions}
                searchResult={searchResult}
                loadingData={loadingData}
            />
        ),
        [userCurrent, loadingButton, mentions, searchResult, loadingData]
    );
    const FriendMemo = useMemo(() => {
        return (
            <Friend
                searchUser={searchUser}
                showCardUser={showCardUser}
                loadingData={loadingData}
                searchUsers={searchUsers}
                friends={userCurrent.friends}
                searchEmpty={searchEmpty}
            />
        );
    }, [
        searchUser,
        showCardUser,
        searchEmpty,
        loadingData,
        searchUsers,
        userCurrent
    ]);
    const CardFlowUserMemo = useMemo(() => {
        return (
            <CardFlowUser
                visible={visible}
                onCancelFlowUser={onCancelFlowUser}
                idFriend={idFriend}
                userCurrent={userCurrent}
            />
        );
    }, [visible, onCancelFlowUser, idFriend, userCurrent]);
    const BannerMemo = useMemo(() => {
        return <Banner />;
    }, []);

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>{BannerMemo}</Col>
                <Col xl={15} lg={15} md={15} sm={24} xs={24}>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>{ToolPostMemo}</Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>{ListContentMemo}</Col>
                    </Row>
                </Col>
                {!isBreak && (
                    <Col xl={9} lg={9} md={9} sm={24} xs={24}>
                        <Affix>{FriendMemo}</Affix>
                    </Col>
                )}
                {visible && CardFlowUserMemo}
            </Row>
        </>
    );
}
