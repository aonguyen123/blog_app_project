import React from 'react';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Empty, Skeleton } from 'antd';
import { FetchDataLoading, PostItem } from 'components';
import allActions from 'actions';
import './styles.css';

const ListPosts = ({
    userIdById,
    userIdCurrent,
    postsById,
    likePostHome,
    dislikePostHome,
    hasMorePostsById,
    nextPageById,
    loadingFetchData
}) => {
    const dispatch = useDispatch();

    const loadItems = () => {
        const page_size = 10;
        dispatch(
            allActions.postActions.loadMorePostById(
                userIdById,
                nextPageById,
                page_size
            )
        );
    };

    if(loadingFetchData > 0) return <FetchDataLoading />
    return (
        <InfiniteScroll
            pageStart={nextPageById}
            loadMore={loadItems}
            hasMore={hasMorePostsById}
            initialLoad={false}
            loader={
                <Skeleton key="loading" avatar paragraph={{ rows: 4 }} active />
            }
        >
            {postsById.length === 0 && !hasMorePostsById ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                postsById.map(value => (
                    <PostItem
                        key={value._id}
                        post={value}
                        likePostHome={likePostHome}
                        dislikePostHome={dislikePostHome}
                        idUser={userIdCurrent}
                    />
                ))
            )}
        </InfiniteScroll>
    );
};

export default ListPosts;
