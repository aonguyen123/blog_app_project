import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { DislikeTwoTone, LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import moment from 'moment';
import {
    ExtraContent,
    ModalViewImage,
    FetchDataLoading,
    RenderImageListContent,
} from './../../../../components';
import allActions from './../../../../actions';
import allConfigs from './../../../../config';
import PostListContent from './../PostListContent/PostListContent';
import './styles.css';

const ListPosts = ({userInfo}) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const postsById = useSelector(state => state.postReducer.postsById);
    const hasMorePostsById = useSelector(state => state.postReducer.hasMoreItemsById);
    const nextPageById = useSelector(state => state.postReducer.nextPageById);

    const dispatch = useDispatch();
    const history = useHistory();
    const idUser = allConfigs.tokenConfigs.getIdUser();

    const IconText = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
    );
    const handleCancel = () => setPreviewVisible(false);

    const loadItems = () => {
        if(Object.keys(userInfo).length !== 0)
        {
            const page_size = 10;
            dispatch(
                allActions.postActions.fetchPostById(idUser, nextPageById, page_size, history)
            );
        }
    };

    const onPreview = async file => {
        setPreviewImage(file.url);
        setPreviewVisible(true);
    };
    const onRemove = file => {
        console.log(file);
    };

    return (
        <>
            <InfiniteScroll
                pageStart={nextPageById}
                loadMore={loadItems}
                hasMore={hasMorePostsById}
            >
                <List
                    size="large"
                    className="articleList"
                    rowKey="id"
                    itemLayout="vertical"
                    dataSource={postsById}
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
                            extra={[<ExtraContent key="more" />]}
                        >
                            <List.Item.Meta
                                title={userInfo.nickname}
                                avatar={
                                    <Avatar src={userInfo.avatar} />
                                }
                                description={moment(item.createdAt).fromNow()}
                            />
                                <PostListContent data={item.content} mentions={item.mentions} />


                            <RenderImageListContent
                                images={item.images}
                                idUser={item.idUser}
                                onPreview={onPreview}
                                onRemove={onRemove}
                            />
                        </List.Item>
                    )}
                >
                    {hasMorePostsById && (
                        <div className="listPost-loading-content">
                            <FetchDataLoading />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
            <ModalViewImage
                handleCancel={handleCancel}
                previewImage={previewImage}
                previewVisible={previewVisible}
            />
        </>
    );
};

export default ListPosts;