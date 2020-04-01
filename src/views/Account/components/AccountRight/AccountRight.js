import React, { useState, lazy, Suspense, useMemo } from 'react';
import { LazyLoading } from './../../../../components';
import { Card } from 'antd';

const ListPosts = lazy(() => import('./../ListPosts/ListPosts'));

export default function AccountRight(props) {
    const { userInfo, postsById } = props;

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
    const renderChildrenByTabKey = (tabKey, userInfo) => {
        if (tabKey === 'posts') {
            return <ListPosts userInfo={userInfo} />;
        }

        if (tabKey === 'applications') {
            return <h1>applications</h1>;
        }
        return null;
    };
    const renderChildren = useMemo(() => renderChildrenByTabKey(tabKey, userInfo), [tabKey, userInfo]);

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
                {renderChildren}
            </Suspense>
        </Card>
    );
}
