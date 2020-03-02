import React, { useState, lazy, Suspense } from 'react';
import { GlobalLoading } from './../../../../components';
import { Card } from 'antd';

const ListPosts = lazy(() => import('./../ListPosts/ListPosts'));

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
                    (8)
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

export default function AccountRight(props) {
    const [tabKey, setTabKey] = useState('posts');

    const renderChildrenByTabKey = tabKey => {
        if (tabKey === 'posts') {
            return <ListPosts />;
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
            <Suspense fallback={<GlobalLoading size="small" />}>
                {renderChildrenByTabKey(tabKey)}
            </Suspense>
        </Card>
    );
}
