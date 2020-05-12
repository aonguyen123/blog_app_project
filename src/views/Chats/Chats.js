import React, {
    useEffect,
    useContext,
    useCallback,
    useMemo,
    useState
} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, message, Form } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { ListRoom, ChatRoomDefault, ModalCreateRoom } from './Components';
import Context from './../../context';
import allActions from '../../actions';
import './styles.css';

const Chats = () => {
    const [type, setType] = useState('');
    const [idRoom, setIdRoom] = useState('');
    const [form] = Form.useForm();
    const { socketRef } = useContext(Context);
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const visible = useSelector(state => state.uiReducer.visible);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const rooms = useSelector(state => state.chatsReducer.rooms);
    const dispatch = useDispatch();
    const history = useHistory();
    const { url } = useRouteMatch();

    useEffect(() => {
        const socket = socketRef.current;
        socket.emit('join', {
            _id: userCurrent._id
        });

        return () => {
            socket.emit('hasLeft');
        };
    }, [socketRef, userCurrent._id]);

    useEffect(() => {
        const socket = socketRef.current;
        dispatch(allActions.chatsActions.getRooms());
        socket.on('message', message => {
            dispatch(allActions.chatsActions.getChatAfter(message));
        });
        socket.on('createRoom', data => {
            dispatch(allActions.uiActions.changeVisible(false));
            dispatch(allActions.chatsActions.getRoomAfter(data));
            dispatch(allActions.uiActions.hideLoadingButton());
        });
        socket.on('onJoin', data => {
            history.push(`${url}/${data.idRoom._id}`);
            dispatch(allActions.uiActions.hideLoadingButton());
        });
        socket.on('welcome', ({ text }) => {
            message.info(text, 4);
        });
        socket.on('deleteRoom', data => {
            dispatch(allActions.chatsActions.deleteRoom(data));
        });

        return () => {
            socket.off('welcome');
            socket.off('message');
            socket.off('createRoom');
            socket.off('onJoin');
            socket.off('deleteRoom');
        };
    }, [dispatch, socketRef, history, url]);

    const onSendMessage = useCallback(
        ({ message }) => {
            if (message) {
                socketRef.current.emit('sendMessage', { message });
            }
        },
        [socketRef]
    );
    const deleteRoom = useCallback(
        idRoom => {
            socketRef.current.emit('deleteRoom', { idRoom });
        },
        [socketRef]
    );
    const openModal = (type, idRoom = null) => {
        setIdRoom(idRoom);
        setType(type);
        dispatch(allActions.uiActions.changeVisible(true));
    };
    const closeModal = () => {
        dispatch(allActions.uiActions.changeVisible(false));
    };
    const createRoom = () => {
        form.submit();
    };
    const onFormFinish = (name, { values, forms }) => {
        if (name === 'createRoom') {
            if (values.upload[0].status === 'uploading') {
                message.warning('Uploading photo, plase wait !!!', 3);
            } else {
                const urlImage = values.upload[0].response.url;
                values.upload = urlImage;
                dispatch(allActions.uiActions.showLoadingButton());
                socketRef.current.emit('createRoom', values, userCurrent._id);
            }
        }
        if (name === 'joinRoom') {
            dispatch(allActions.uiActions.showLoadingButton());
            socketRef.current.emit(
                'onJoin',
                { password: values.password_room, idRoom },
                err => {
                    message.error(err, 4);
                    dispatch(allActions.uiActions.hideLoadingButton());
                }
            );
        }
    };

    const chatsDefaultMemo = useMemo(
        () => (
            <ChatRoomDefault
                onSendMessage={onSendMessage}
                userCurrent={userCurrent}
            />
        ),
        [onSendMessage, userCurrent]
    );

    return (
        <GridContent>
            <Row gutter={[16, 16]}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <ListRoom
                        socketRef={socketRef}
                        _id={userCurrent._id}
                        onConfirm={deleteRoom}
                        rooms={rooms}
                        openModal={openModal}
                    />
                </Col>

                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    {chatsDefaultMemo}
                </Col>
            </Row>

            <Form.Provider onFormFinish={onFormFinish}>
                <ModalCreateRoom
                    type={type}
                    visible={visible}
                    handleCancel={closeModal}
                    handleOk={createRoom}
                    loadingButton={loadingButton}
                    form={form}
                />
            </Form.Provider>
        </GridContent>
    );
};

export default Chats;
