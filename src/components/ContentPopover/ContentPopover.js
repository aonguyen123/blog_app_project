import React from 'react';
import { Avatar, Divider, Button, Popover, Tag } from 'antd';
import './styles.css';

export default function ContentPopover({ user }) {
    const showContent = user => (
        <div className="listContentWrapper-profile">
            <div>
                <Avatar
                    size="large"
                    shape="square"
                    src={user.avatar}
                    className="listContent-avatar"
                />
                <div className="listContent-name">{user.nickname}</div>
                <div className="listContent-address">{`${user.district} - ${user.provinceOrCity}`}</div>
                <div style={{ clear: 'left' }}></div>
                <div className="listContent-story">{user.description}</div>
            </div>
            <Divider dashed />
            <div>
                <Button type="link" className="listContent-buttonView-profile">
                    View
                </Button>
            </div>
        </div>
    );

    return (
        <Popover
            placement="topLeft"
            title="Profile"
            content={showContent(user)}
            trigger="hover"
        >
            <Tag color="cyan">{user.nickname}</Tag>
        </Popover>
    );
}
