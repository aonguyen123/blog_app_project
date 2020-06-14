import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Modal, Tooltip, Typography, Space, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { useDispatch, useSelector } from 'react-redux';
import {
    UserAddOutlined,
    FundViewOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FetchDataLoading } from 'components';
import allActions from 'actions';
import './styles.css';

const { Meta } = Card;

export default function CardFlowUser({
    visible,
    onCancelFlowUser,
    idFriend,
    userCurrent,
    socketRef
}) {
    const dispatch = useDispatch();
    const userById = useSelector(state => state.userReducer.userById);
    const statusAddFriend = useSelector(
        state => state.userReducer.statusAddFriend
    );

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
        socketRef.current.emit(
            'sendAddFriend',
            {
                idSender: userCurrent._id,
                idReceiver: idFriend
            },
            error => {
                message.error(error, 4);
            }
        );
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
                        <div>
                            <LazyLoadImage
                                alt=""
                                height={200}
                                width='100%'
                                src={userById.photoURL}
                                effect="blur"
                            />
                        </div>
                    }
                    actions={[
                        <Tooltip
                            title={formatMessage({
                                id: 'home.modalViewUser.viewProfile'
                            })}
                        >
                            <Link to={`/profile/${idFriend}`}>
                                <FundViewOutlined key="view-profile" />
                            </Link>
                        </Tooltip>,
                        <Tooltip
                            title={
                                userCurrent.friends.findIndex(
                                    friend => friend.idUser._id === idFriend
                                ) !== -1
                                    ? formatMessage({
                                          id: 'home.modalViewUser.follow'
                                      })
                                    : formatMessage({
                                          id: 'home.modalViewUser.addFriend'
                                      })
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
                                        {`${
                                            userById.friends.length
                                        } ${formatMessage({
                                            id: 'home.modalViewUser.friends'
                                        })}`}
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
