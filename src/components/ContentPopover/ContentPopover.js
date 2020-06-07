import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import './styles.css';

export default function ContentPopover({ user, idUserCurrent }) {
    
    return (
        <div className="listContentWrapper-profile">
            <div>
                <Avatar
                    size="large"
                    src={user.photoURL}
                    className="listContent-avatar"
                />
                <div className="listContent-name">{user.displayName}</div>
                <div className="listContent-address">{`${user?.district?.label} - ${user?.provinceOrCity?.label}`}</div>
                <div style={{ clear: 'left' }}></div>
                <div className="listContent-story">{user.description}</div>
            </div>
            <div className='button-view'>
                <Link to={user._id === idUserCurrent ? '/account' : `/profile/${user._id}`}>
                    <Button
                        type="link"
                        className="listContent-buttonView-profile"
                    >
                        {formatMessage({id: 'popoverUser.view'})}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
