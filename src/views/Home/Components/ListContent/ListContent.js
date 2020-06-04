import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch } from 'react-redux';
import { Skeleton, Empty } from 'antd';
import allActions from 'actions';
import { PostList, FetchDataLoading } from 'components';

export default function ListContent({
    posts,
    idUser,
    likePostHome,
    dislikePostHome,
    hasMorePosts,
    nextPage,
    loadingFetchData
}) {
    const dispatch = useDispatch();

    const loadItems = () => {
        const page_size = 10;
        dispatch(allActions.postActions.loadMorePost(nextPage, page_size, idUser));
    };

    if(loadingFetchData > 0) return <FetchDataLoading />
    return (
        <InfiniteScroll
            pageStart={nextPage}
            loadMore={loadItems}
            hasMore={hasMorePosts}
            initialLoad={false}
            loader={
                <Skeleton key="loading" avatar paragraph={{ rows: 4 }} active />
            }
        >
            {posts.length === 0 && !hasMorePosts ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                posts.map(value => (
                    <PostList
                        key={value._id}
                        post={value}
                        idUser={idUser}
                        likePostHome={likePostHome}
                        dislikePostHome={dislikePostHome}
                    />
                ))
            )}
        </InfiniteScroll>
    );
}
