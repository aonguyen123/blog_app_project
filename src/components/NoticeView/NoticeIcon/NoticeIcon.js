import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin, Tabs, Card, Menu, Row, Col } from 'antd';
import useMergeValue from 'use-merge-value';
import NoticeList from './../NoticeList';
import HeaderDropdown from './../../HeaderDropdown';
import './styles.css';

const { TabPane } = Tabs;

const NoticeIcon = props => {

    const getNotificationBox = () => {
        const {
            children,
            loading,
            onClear,
            onTabChange,
            onItemClick,
            onViewMore,
            clearText,
            viewMoreText
        } = props;

        if (!children) {
            return null;
        }

        const panes = [];
        React.Children.forEach(children, child => {
            if (!child) {
                return;
            }
            const {
                list,
                title,
                count,
                tabKey,
                showClear,
                showViewMore
            } = child.props;

            const len = list && list.length ? list.length : 0;
            const msgCount = count || count === 0 ? count : len;
            const tabTitle = msgCount > 0 ? `${title} (${msgCount})` : title;
            panes.push(
                <TabPane tab={tabTitle} key={tabKey}>
                    <NoticeList
                        loading={loading}
                        clearText={clearText}
                        viewMoreText={viewMoreText}
                        data={list}
                        onClear={() => onClear && onClear(title, tabKey)}
                        onClick={item =>
                            onItemClick && onItemClick(item, child.props)
                        }
                        onViewMore={event =>
                            onViewMore && onViewMore(child.props, event)
                        }
                        showClear={showClear}
                        showViewMore={showViewMore}
                        title={title}
                        {...child.props}
                    />
                </TabPane>
            );
        });
        return (
            <div style={{ boxShadow: '0 1px 4px rgba(0,21,41,.12)', background: '#fff' }}>
                <Tabs onChange={onTabChange}>{panes}</Tabs>
            </div>
        );
    };

    const { count, bell } = props;

    const [visible, setVisible] = useMergeValue(false, {
        value: props.popupVisible,
        onChange: props.onPopupVisibleChange
    });
    const notificationBox = getNotificationBox();

    const trigger = (
        <span className="noticeButton">
            <Badge
                count={4}
                style={{
                    boxShadow: 'none',
                    fontSize: '10px'
                }}
            >
                <BellOutlined className="icon" />
            </Badge>
        </span>
    );

    if (!notificationBox) {
        return trigger;
    }

    return (
        <HeaderDropdown
            placement="bottomRight"
            overlay={notificationBox}
            overlayClassName="popover"
            trigger={['click']}
            visible={visible}
            onVisibleChange={setVisible}
        >
            {trigger}
        </HeaderDropdown>
    );
};
NoticeIcon.defaultProps = {
    emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
};
NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
