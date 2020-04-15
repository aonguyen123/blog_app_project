import React, { memo } from 'react';
import { List, Card } from 'antd';
import moment from 'moment';
import './styles.css';

const UsersList = memo(({ usersOnline }) => {
    return (
        <Card size="small" hoverable={true} title="List users">
            <List
                size="small"
                dataSource={usersOnline}
                loading={usersOnline.length === 0 ? true : false}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.username}
                            avatar={
                                <div className="img_cont">
                                    <img
                                        alt="avatar"
                                        src={item.photoURL}
                                        className="rounded-circle user_img"
                                    />
                                    <span
                                        className={`online_icon ${item.status}`}
                                    ></span>
                                </div>
                            }
                            description={moment(item.time).fromNow()}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
});

export default UsersList;
