import React from 'react';
import { Card, List, Avatar } from 'antd';
import {
    LockOutlined,
    DeleteOutlined,
    UnlockOutlined,
    LoginOutlined
} from '@ant-design/icons';
import Extra from './../Extra';
import {
    ExtraContent,
    ScrollToBottomCom,
    PopConfirm
} from './../../../../components';

export default function ListRoom({
    socketRef,
    _id,
    onConfirm,
    openModal,
    rooms
}) {
    const handleJoinRoom = idRoom => {
        socketRef.current.emit('onJoin', { idRoom });
    };

    return (
        <>
            <Card
                title="Room list"
                size="small"
                hoverable={true}
                extra={
                    <ExtraContent
                        menu={Extra({
                            handleClick: () => openModal('CREATE_ROOM')
                        })}
                    />
                }
            >
                <ScrollToBottomCom height="468px" width="100%">
                    <List
                        dataSource={rooms}
                        size="small"
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    item.password ? (
                                        <LockOutlined />
                                    ) : (
                                        <UnlockOutlined />
                                    ),
                                    item.password ? (
                                        <LoginOutlined
                                            onClick={() =>
                                                openModal('JOIN_ROOM', item._id)
                                            }
                                        />
                                    ) : (
                                        <LoginOutlined
                                            onClick={() =>
                                                handleJoinRoom(item._id)
                                            }
                                        />
                                    ),
                                    item.userId._id === _id && (
                                        <PopConfirm
                                            title="Are you sure delete this room？"
                                            okText="Yes"
                                            cancelText="No"
                                            placement="topRight"
                                            onConfirm={() =>
                                                onConfirm(item._id)
                                            }
                                        >
                                            <DeleteOutlined />
                                        </PopConfirm>
                                    )
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.roomName}
                                    description={`${item.userId.displayName} created`}
                                    avatar={
                                        <Avatar
                                            size="default"
                                            src={item.roomImage}
                                        />
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </ScrollToBottomCom>
            </Card>
        </>
    );
}
