import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Timeline, Empty } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import allActions from 'actions';
import { FetchDataLoading } from 'components';
import descriptionEvent from 'constants/description_event';

export default function History() {
    const userCurrent = useSelector(state => state.userReducer.userInfo);
    const historys = useSelector(state => state.eventReducer.historys);
    const loadingFetchData = useSelector(
        state => state.uiReducer.loadingFetchData
    );
    const nextPage = useSelector(state => state.eventReducer.nextPage);
    const hasMoreItems = useSelector(state => state.eventReducer.hasMoreItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            allActions.eventsActions.fetchHistorys(1, 15, userCurrent._id)
        );
    }, [dispatch, userCurrent._id]);

    const loadHistorys = () => {
        dispatch(
            allActions.eventsActions.loadMoreHistorys(
                nextPage,
                15,
                userCurrent._id
            )
        );
    };

    if (loadingFetchData > 0) return <FetchDataLoading />;
    return (
        <div>
            <InfiniteScroll
                pageStart={nextPage}
                loadMore={loadHistorys}
                hasMore={hasMoreItems}
                initialLoad={false}
            >
                {historys.length === 0 && !hasMoreItems ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <Timeline pending={hasMoreItems && 'Loading...'} mode="alternate">
                        {historys.map(history => (
                            <Timeline.Item
                                label={moment(history.createdAt).format(
                                    'DD/MM/YYYY HH:mm'
                                )}
                                key={history._id}
                                dot={
                                    history.description === 'ADD_FRIEND_OK' && (
                                        <TeamOutlined
                                            style={{
                                                fontSize: '16px',
                                                color: 'green'
                                            }}
                                        />
                                    )
                                }
                                color={history.status === 0 ? 'red' : 'blue'}
                            >
                                {
                                    <>
                                        You{' '}
                                        {descriptionEvent[history.description]}{' '}
                                        with{' '}
                                        <strong>
                                            {history.idReceiver.displayName}
                                        </strong>
                                    </>
                                }
                            </Timeline.Item>
                        ))}
                    </Timeline>
                )}
            </InfiniteScroll>
        </div>
    );
}
