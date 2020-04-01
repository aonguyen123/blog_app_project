import React, { useState, memo } from 'react';
import { DislikeTwoTone, LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import { Avatar, Col, List, Row } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import allActions from './../../../../actions';
import {
    ContentPopover,
    FetchDataLoading,
    RenderImageListContent,
    ModalViewImage, 
    ExtraContent
} from './../../../../components';
import './styles.css';

const ListContent = memo(({history}) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const posts = useSelector(state => state.postReducer.posts);
    const hasMorePosts = useSelector(state => state.postReducer.hasMoreItems);
    const nextPage = useSelector(state => state.postReducer.nextPage);
    const dispatch = useDispatch();

    const IconText = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
    );
    const handleCancel = () => setPreviewVisible(false);
    const loadItems = () => {
        const page_size = 10;
        dispatch(
            allActions.postActions.fetchPost(history, nextPage, page_size)
        );
    };
    const onPreview = async file => {
        setPreviewImage(file.url);
        setPreviewVisible(true);
    };
    const onRemove = file => {
        console.log(file);
    };

    return (
        <div className="list-content">
            <InfiniteScroll
                pageStart={nextPage}
                loadMore={loadItems}
                hasMore={hasMorePosts}
            >
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={posts}
                    renderItem={item => (
                        <List.Item
                            style={{ marginTop: '13px' }}
                            key={item._id}
                            actions={[
                                <IconText
                                    icon={<LikeTwoTone />}
                                    text="156"
                                    key="list-vertical-like"
                                />,
                                <IconText
                                    icon={<DislikeTwoTone />}
                                    text="156"
                                    key="list-vertical-dislike"
                                />,
                                <IconText
                                    icon={<MessageTwoTone />}
                                    text="2"
                                    key="list-vertical-message"
                                />
                            ]}
                            extra={[<ExtraContent key='more' />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.idUser.avatar} />}
                                title={item.idUser.nickname}
                                description={moment(item.createdAt).fromNow()}
                            />
                            {item.content ? (
                                <Row gutter={[16, 16]}>
                                    <Col xl={24} lg={24} md={24} sm={24}>
                                        {item.content}
                                    </Col>
                                </Row>
                            ) : null}
                            {item.mentions.length > 0 ? (
                                <Row gutter={[10, 10]}>
                                    <Col xl={24} lg={24} md={24} sm={24}>
                                        {item.mentions.map(value => (
                                            <ContentPopover
                                                key={value._id}
                                                user={value.idUser}
                                            />
                                        ))}
                                    </Col>
                                </Row>
                            ) : null}
                            <Row gutter={[16, 16]}>
                                <Col xl={24} lg={24} md={24} sm={24}>
                                    <RenderImageListContent
                                        images={item.images}
                                        idUser={item.idUser._id}
                                        onPreview={onPreview}
                                        onRemove={onRemove}
                                    />
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                >
                    {hasMorePosts && (
                        <div className="loading-content">
                            <FetchDataLoading
                                tooltip="loading"
                            />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
            <ModalViewImage
                handleCancel={handleCancel}
                previewImage={previewImage}
                previewVisible={previewVisible}
            />
        </div>
    );
});

export default ListContent;