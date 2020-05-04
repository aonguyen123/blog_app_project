import React, { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Empty } from 'antd';
import allActions from './../../../../actions';

import { CardList } from './../../../../components';

const ListContent = memo(({posts}) => {
    const hasMorePosts = useSelector(state => state.postReducer.hasMoreItems);
    const nextPage = useSelector(state => state.postReducer.nextPage);
    const dispatch = useDispatch();

    const loadItems = () => {
        const page_size = 10;
        dispatch(allActions.postActions.fetchPost(nextPage, page_size));
    };

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
                posts.map(value => <CardList key={value._id} post={value} />)
            )}
        </InfiniteScroll>
    );
});

export default ListContent;
