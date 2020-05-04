import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Empty, Skeleton } from 'antd';
import { CardList } from './../../../../components';
import allActions from './../../../../actions';
import './styles.css';

const ListPosts = ({ userId, postsById }) => {
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
                        <CardList
                            key={value._id}
                            post={value}
                        />
                    ))
                )}
            </InfiniteScroll>
        </>
    );
};

export default ListPosts;
