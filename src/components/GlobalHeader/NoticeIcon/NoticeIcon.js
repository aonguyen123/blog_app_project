import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { formatMessage } from 'umi-plugin-react/locale';
import { BellOutlined } from '@ant-design/icons';
import descriptionEvent from 'constants/description_event';
import moment from 'moment';
import ConfirmEvent from './../../ConfirmEvent';
import Context from 'context';
import allActions from 'actions';
import './styles.css';

export default function NoticeIconView({ events, loadingEvent, idCur }) {
    const { socketRef } = useContext(Context);
    const dispatch = useDispatch();

    async function confirmEvent(idEvent) {
        return new Promise((resolve, reject) => {
            socketRef.current.emit('addFriend', { idEvent }, () => {
                resolve();
            });
        });
    }
    async function onCancel(idEvent) {
        return new Promise((resolve, reject) => {
            socketRef.current.emit('addFriendCancel', {idEvent}, () => {
                resolve();
            });
        })
    }

    function onItemClick(item, tabProps) {
        if (item.type === 'ADD_FRIEND') {
            ConfirmEvent(item.id, confirmEvent, onCancel);
        } else {
            dispatch(allActions.eventsActions.removeEvent(item.id));
        }
    }

    function onClear(tabTitle) {
        dispatch(allActions.eventsActions.removeAllEvent(tabTitle, idCur));
    }
    function formatEvent(events) {
        if (events.length === 0) return;
        const data = [];
        events.map(item => {
            return data.push({
                id: item._id,
                avatar: item.idSender.photoURL,
                title: (
                    <>
                        <strong>{item.idSender.displayName}</strong>{' '}
                        {descriptionEvent[item.description]}
                    </>
                ),
                datetime: moment(item.createdAt).format('DD/MM/YYYY HH:mm'),
                type: item.type,
                clickClose: item.type === 'ADD_FRIEND' ? true : false
            });
        });
        return data;
    }

    function getNoticeData(notices) {
        if (notices.length === 0) {
            return {};
        }
        const data = formatEvent(notices);

        const newNotices = data.map(notice => {
            const newNotice = { ...notice };
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            return newNotice;
        });
        return newNotices.reduce((pre, data) => {
            if (!pre[data.type]) {
                pre[data.type] = [];
            }
            pre[data.type].push(data);
            return pre;
        }, {});
    }

    const noticeData = getNoticeData(events);

    return (
        <div
            style={{
                textAlign: 'right',
                padding: '0 20px'
            }}
        >
            <NoticeIcon
                bell={<BellOutlined />}
                count={events.length}
                onItemClick={onItemClick}
                onClear={onClear}
                loading={loadingEvent}
                locale={{
                    emptyText: formatMessage({ id: 'notification.emptyText' }),
                    clear: formatMessage({ id: 'notification.clear' })
                }}
            >
                <NoticeIcon.Tab
                    list={noticeData.ADD_FRIEND}
                    title={formatMessage({
                        id: 'notification.title.addFriend'
                    })}
                    emptyImage="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                />
                <NoticeIcon.Tab
                    list={noticeData.NOTIFICATION}
                    title={formatMessage({
                        id: 'notification.title.notification'
                    })}
                    emptyImage="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                />
            </NoticeIcon>
        </div>
    );
}
