import React from 'react';
import { Avatar, List, Skeleton } from 'antd';
import './styles.css';

export default function NoticeList({
    data = [],
    onClick,
    onClear,
    title,
    onViewMore,
    emptyText,
    showClear = true,
    clearText,
    viewMoreText,
    showViewMore = false,
    loading
}) {
    if (data.length === 0 && !loading) {
        return (
            <div className="notFound">
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    alt="not found"
                />
                <div>{emptyText}</div>
            </div>
        );
    }

    return (
        <div>
            <List
                className="list"
                dataSource={data}
                loading={loading}
                renderItem={(item, i) => {
                    const leftIcon = item.avatar ? (
                        typeof item.avatar === 'string' ? (
                            <Avatar className="avatar" src={item.avatar} />
                        ) : (
                            <span className="iconElement">{item.avatar}</span>
                        )
                    ) : null;
                    return (
                        <List.Item
                            //className={itemCls}
                            key={item.key || i}
                            onClick={() => onClick && onClick(item)}
                        >
                            <List.Item.Meta
                                className="meta"
                                avatar={leftIcon}
                                title={
                                    <div className="title">{item.title}</div>
                                }
                                description={
                                    <div>
                                        <div className="description">
                                            {item.description}
                                        </div>
                                        <div className="datetime">
                                            {item.datetime}
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    );
                }}
            />
            <div className="bottomBar">
                {showClear ? (
                    <div onClick={onClear}>
                        {clearText} {title}
                    </div>
                ) : null}
                {showViewMore ? (
                    <div
                        onClick={e => {
                            if (onViewMore) {
                                onViewMore(e);
                            }
                        }}
                    >
                        {viewMoreText}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
