import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, List, Avatar, Form, message } from 'antd';
import {
    LockOutlined,
    DeleteOutlined,
    UsergroupAddOutlined,
    UnlockOutlined
} from '@ant-design/icons';
import Extra from './../Extra';
import {
    ExtraContent,
    ModalContent,
    ScrollToBottomCom,
    PopConfirm,
    PopOver
} from './../../../../components';
import FormCreateRoom from './../FormCreateRoom';
import ContentPopOver from './../ContentPopOver';
import allActions from '../../../../actions';

export default function ListRoom({ socketRef, _id, onConfirm }) {
    const [form] = Form.useForm();
    const rooms = useSelector(state => state.chatsReducer.rooms);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const visible = useSelector(state => state.chatsReducer.visible);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.chatsActions.getRooms());
    }, [dispatch]);

    const openModal = () => {
        dispatch(allActions.chatsActions.changeVisibleCreateRoom(true));
    };
    const handleCancel = () => {
        form.resetFields();
        dispatch(allActions.chatsActions.changeVisibleCreateRoom(false));
    };
    const handleOk = useCallback(() => {
        form.submit();
    }, [form]);
    const onFormFinish = (name, { values, forms }) => {
        if (name === 'createRoom') {
            if (values.upload[0].status === 'uploading') {
                message.warning('Uploading photo, plase wait !!!', 3);
            } else {
                dispatch(allActions.uiActions.showLoadingButton());
                const urlImage = values.upload[0].response.url;
                values.upload = urlImage;
                socketRef.current.emit('createRoom', values, _id);
            }
        }
    };
    const onJoin = (value, idRoom) => {
        dispatch(allActions.uiActions.showLoadingButton());
        socketRef.current.emit('onJoin', {password: value.password, idRoom}, (err) => {
            message.error(err, 4);
            dispatch(allActions.uiActions.hideLoadingButton());
        });
    };
    const handleJoinRoom = (idRoom) => {
        socketRef.current.emit('onJoin', {idRoom});
    }

    return (
        <>
            <Card
                title="Room list"
                size="small"
                hoverable={true}
                extra={<ExtraContent menu={Extra(openModal)} />}
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
                                        <PopOver
                                            placement="topRight"
                                            title="Join"
                                            content={
                                                <ContentPopOver
                                                    onJoin={onJoin}
                                                    idRoom={item._id}
                                                    loadingButton={loadingButton}
                                                />
                                            }
                                            trigger="click"
                                        >
                                            <UsergroupAddOutlined />
                                        </PopOver>
                                    ) : (
                                        <UsergroupAddOutlined onClick={() => handleJoinRoom(item._id)} />
                                    ),
                                    item.userId._id === _id && (
                                        <PopConfirm
                                            title="Are you sure delete this room？"
                                            okText="Yes"
                                            cancelText="No"
                                            placement="topRight"
                                            onConfirm={() => onConfirm(item._id)}
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
            <Form.Provider onFormFinish={onFormFinish}>
                <ModalContent
                    title="Create room"
                    visible={visible}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    confirmLoading={loadingButton}
                    content={<FormCreateRoom form={form} />}
                />
            </Form.Provider>
        </>
    );
}
