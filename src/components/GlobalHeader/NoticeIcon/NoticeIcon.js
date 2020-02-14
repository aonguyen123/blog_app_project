import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';

export default function NoticeIcon() {
    return (
        <span className="noticeButton">
            <Badge
                count={4}
                style={{
                    boxShadow: 'none',
                    fontSize: '10px'
                }}
            >
                <Link to='/notification'>
                    <BellOutlined 
                        title={formatMessage({id: 'globalHeader.notification'})} 
                        className="icon" 
                    />
                </Link>
            </Badge>
        </span>
    )
};
