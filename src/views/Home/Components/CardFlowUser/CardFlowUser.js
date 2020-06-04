import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Modal, Tooltip, Typography, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    UserAddOutlined,
    FundViewOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    TeamOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import Img from 'react-image';
import { FetchDataLoading } from 'components';
import allActions from 'actions';
import Context from 'context';
import './styles.css';

const { Meta } = Card;

export default function CardFlowUser({
    visible,
    onCancelFlowUser,
    idFriend,
    userCurrent
}) {
    const dispatch = useDispatch();
    const userById = useSelector(state => state.userReducer.userById);
    const statusAddFriend = useSelector(
        state => state.userReducer.statusAddFriend
    );
    const { socketRef } = useContext(Context);

    useEffect(() => {
        dispatch(
            allActions.userActions.fetchUserById(idFriend, userCurrent._id)
        );

        return () => {
            dispatch(allActions.userActions.cleanUserById());
        };
    }, [dispatch, idFriend, userCurrent._id]);
    useEffect(() => {
        const socket = socketRef.current;
        socket.on('sendAddFriendSuccess', data => {
            dispatch(allActions.userActions.sendAddFriendSuccess(data));
        });

        return () => {
            socket.off('sendAddFriendSuccess');
        };
    }, [socketRef, dispatch]);

    const handleSendAddFriend = () => {
        if (statusAddFriend) return;
        socketRef.current.emit('sendAddFriend', {
            idSender: userCurrent._id,
            idReceiver: idFriend
        });
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCancelFlowUser}
            footer={null}
            width={350}
            centered={false}
        >
            {Object.keys(userById).length === 0 ? (
                <FetchDataLoading />
            ) : (
                <Card
                    bordered={false}
                    cover={
                        <Img
                            src={userById.photoURL}
                            alt="avatar"
                            style={{ height: '200px', objectFit: 'cover' }}
                            loader={
                                <Spin indicator={<LoadingOutlined spin />} />
                            }
                        />
                    }
                    actions={[
                        <Tooltip title="View profile">
                            <Link to={`/profile/${idFriend}`}>
                                <FundViewOutlined key="view-profile" />
                            </Link>
                        </Tooltip>,
                        <Tooltip
                            title={
                                userCurrent.friends.findIndex(
                                    friend => friend.idUser._id === idFriend
                                ) !== -1
                                    ? 'Friend'
                                    : 'Add friend'
                            }
                        >
                            {userCurrent.friends.findIndex(
                                friend => friend.idUser._id === idFriend
                            ) !== -1 ? (
                                <TeamOutlined style={{ color: '#1890FF' }} />
                            ) : (
                                <UserAddOutlined
                                    style={{
                                        color: statusAddFriend && '#1890FF'
                                    }}
                                    key="add-user"
                                    onClick={handleSendAddFriend}
                                />
                            )}
                        </Tooltip>
                    ]}
                >
                    <Meta
                        title={<p>{userById.displayName}</p>}
                        description={
                            <div>
                                <Space direction="vertical">
                                    {userById.district !== '' &&
                                        userById.provinceOrCity !== '' && (
                                            <Typography>
                                                <EnvironmentOutlined />{' '}
                                                {`${userById.district.label} - ${userById.provinceOrCity.label}`}
                                            </Typography>
                                        )}
                                    {userById.phonenumber !== '' && (
                                        <Typography>
                                            <PhoneOutlined />{' '}
                                            {`+84${userById.phonenumber}`}
                                        </Typography>
                                    )}
                                    <Typography>
                                        <TeamOutlined />{' '}
                                        {`${userById.friends.length} friends`}
                                    </Typography>
                                </Space>
                            </div>
                        }
                    />
                </Card>
            )}
        </Modal>
    );
}
