import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import './styles.css';

export default function ContentPopover({ user }) {
    return (
        <div className="listContentWrapper-profile">
            <div>
                <Avatar
                    size="large"
                    src={user.photoURL}
                    className="listContent-avatar"
                />
                <div className="listContent-name">{user.displayName}</div>
                {user?.district && user?.provinceOrCity && (
                    <div className="listContent-address">{`${user.district} - ${user.provinceOrCity}`}</div>
                )}
                <div style={{ clear: 'left' }}></div>
                <div className="listContent-story">{user.description}</div>
            </div>
            <div>
                <Link to={`/profile/${user._id}`}>
                    <Button
                        type="link"
                        className="listContent-buttonView-profile"
                    >
                        View
                    </Button>
                </Link>
            </div>
        </div>
    );
}
