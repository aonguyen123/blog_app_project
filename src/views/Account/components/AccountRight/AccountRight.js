import React, { useState, lazy, Suspense } from 'react';
import { LazyLoading } from './../../../../components';
import { Card } from 'antd';

const ListPosts = lazy(() => import('./../ListPosts/ListPosts'));

export default function AccountRight({
    userId,
    postsById,
    likePostHome,
    dislikePostHome
}) {
    const [tabKey, setTabKey] = useState('posts');
    const operationTabList = [
        {
            key: 'posts',
            tab: (
                <span>
                    Posts{' '}
                    <span
                        style={{
                            fontSize: 14
                        }}
                    >
                        {`(${postsById.length})`}
                    </span>
                </span>
            )
        },
        {
            key: 'applications',
            tab: (
                <span>
                    应用{' '}
                    <span
                        style={{
                            fontSize: 14
                        }}
                    >
                        (8)
                    </span>
                </span>
            )
        }
    ];

    const renderChildrenByTabKey = (tabKey, userId, postsById) => {
        if (tabKey === 'posts') {
            return (
                <ListPosts
                    userId={userId}
                    postsById={postsById}
                    likePostHome={likePostHome}
                    dislikePostHome={dislikePostHome}
                />
            );
        }

        if (tabKey === 'applications') {
            return <h1>applications</h1>;
        }
        return null;
    };

    const onTabChange = key => {
        setTabKey(key);
    };

    return (
        <Card
            className="tabCard"
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
        >
            <Suspense fallback={<LazyLoading size="small" />}>
                {renderChildrenByTabKey(tabKey, userId, postsById)}
            </Suspense>
        </Card>
    );
}
