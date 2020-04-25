import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import moment from 'moment';
import Extra from './../Extra';
import { ExtraContent, ScrollToBottomCom } from './../../../../components';
import './styles.css';

function UsersList() {
    const userRoom = useSelector(state => state.chatsReducer.userRoom);
    
    return (
        <Card size="small" hoverable={true} title="List users">
            <ScrollToBottomCom height='492px' width='100%'>
            <List
                itemLayout='vertical'
                size="small"
                dataSource={userRoom}
                renderItem={item => (
                    <List.Item
                        extra={[<ExtraContent key="more" menu={Extra} />]}
                    >
                        <List.Item.Meta
                            title={item.idUser.displayName}
                            avatar={
                                <div className="img_cont">
                                    <img
                                        alt="avatar"
                                        src={item.idUser.photoURL}
                                        className="rounded-circle user_img"
                                    />
                                    <span
                                        className={item.status === 'online' ? 'online_icon' : 'online_icon offline'}
                                    ></span>
                                </div>
                            }
                            description={item.status === 'online' ? 'online' : moment(item.updatedAt).fromNow()}
                        />
                    </List.Item>
                )}
            />
            </ScrollToBottomCom>
        </Card>
    );
};

export default UsersList;
