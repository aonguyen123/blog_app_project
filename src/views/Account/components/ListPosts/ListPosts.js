import React from 'react';
import { List, Avatar } from 'antd';
import { DislikeTwoTone, LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import './styles.css';
import mock from './mock';
import PostListContent from './../PostListContent/PostListContent';

export default function ListPosts() {
    const IconText = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
    );

    return (
        <List
            size="large"
            className="articleList"
            rowKey="id"
            itemLayout="vertical"
            dataSource={mock}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText
                            key="like"
                            icon={<LikeTwoTone />}
                            text={item.like}
                        />,
                        <IconText
                            key="dislike"
                            icon={<DislikeTwoTone />}
                            text={item.star}
                        />,
                        <IconText
                            key="message"
                            icon={<MessageTwoTone />}
                            text={item.message}
                        />
                    ]}
                >
                    <List.Item.Meta
                        title={
                            <a className="listItemMetaTitle" href={item.href}>
                                {item.title}
                            </a>
                        }
                        avatar={<Avatar src='https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' />}
                    />
                    <PostListContent data={item} />
                </List.Item>
            )}
        />
    );
}
