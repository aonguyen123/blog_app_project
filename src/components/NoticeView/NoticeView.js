import React, { useEffect, useState } from 'react';
import { Tag, message } from 'antd';
import moment from 'moment';
import NoticeIcon from './NoticeIcon';

const dataSource = [
    {
        title: 'test',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'description description description descriptiondescription description description description',
        datetime: moment.now()
    },
    {
        title: 'test',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'description description description descriptiondescription description description description',
        datetime: moment.now()
    }
]

export default function NoticeView(props) {
    const [loadingNotice, setLoadingNotice] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchingNotices = () => {
            setTimeout(() => {
                setData(dataSource);
                setLoadingNotice(false);
            }, 5000);
        }
        fetchingNotices();
    })

    const handleNoticeClear = (title, key) => {        
        message.success(`${'清空了'} ${title}`);
    };
    
    const getUnreadData = noticeData => {
        const unreadMsg = {};
        Object.keys(noticeData).forEach(key => {
            const value = noticeData[key];

            if (!unreadMsg[key]) {
                unreadMsg[key] = 0;
            }

            if (Array.isArray(value)) {
                unreadMsg[key] = value.filter(item => !item.read).length;
            }
        });
        return unreadMsg;
    };

    const unreadMsg = getUnreadData(data);

    return (
        <NoticeIcon
            className='action'
            // count={currentUser && currentUser.unreadCount}
            onItemClick={item => {
                
            }}
            loading={loadingNotice}
            clearText="清空"
            viewMoreText="查看更多"
            onClear={handleNoticeClear}
            //onPopupVisibleChange={onNoticeVisibleChange}
            onViewMore={() => message.info('Click on view more')}
            clearClose
        >
            <NoticeIcon.Tab
                tabKey="notification"
                // count={unreadMsg.notification}
                count={4}
                list={data}
                title="通知"
                emptyText="你已查看所有通知"
                showViewMore
            />
            <NoticeIcon.Tab
                tabKey="message"
                //count={unreadMsg.message}
                count={4}
                list={data}
                title="消息"
                emptyText="您已读完所有消息"
                showViewMore
            />
            <NoticeIcon.Tab
                tabKey="event"
                title="待办"
                emptyText="你已完成所有待办"
                count={4}
                //count={unreadMsg.event}
                list={data}
                showViewMore
            />
        </NoticeIcon>
    );
}
