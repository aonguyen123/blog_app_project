import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Empty, Skeleton } from 'antd';
import { PostList } from './../../../../components';
import allActions from './../../../../actions';
import './styles.css';

const ListPosts = ({ userId, postsById, likePostHome, dislikePostHome }) => {
    const hasMorePostsById = useSelector(
        state => state.postReducer.hasMoreItemsById
    );
    const nextPageById = useSelector(state => state.postReducer.nextPageById);
    const dispatch = useDispatch();

    const loadItems = () => {
        const page_size = 10;
        dispatch(
            allActions.postActions.fetchPostById(
                userId,
                nextPageById,
                page_size
            )
        );
    };

    return (
        <>
            <InfiniteScroll
                pageStart={nextPageById}
                loadMore={loadItems}
                hasMore={hasMorePostsById}
                initialLoad={false}
                loader={<Skeleton key='loading' avatar paragraph={{ rows: 4 }} active />}
            >
                {postsById.length === 0 && !hasMorePostsById ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    postsById.map(value => (
                        <PostList
                            key={value._id}
                            post={value}
                            likePostHome={likePostHome}
                            dislikePostHome={dislikePostHome}
                            idUser={userId}
                        />
                    ))
                )}
            </InfiniteScroll>
        </>
    );
};

export default ListPosts;
