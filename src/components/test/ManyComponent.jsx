import React, { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin, Icon } from 'antd';
import { BASE_URI } from './../../constants/base_url';

export default function ManyComponent() {
    const [tracks, setTracks] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const loadItems = page => {
        axios
            .get(BASE_URI+'/getAllData', {
                params: {
                    page,
                    page_size: 20
                }
            })
            .then(res => {
                const items = res.data;
                setTracks([...tracks, ...items.users]);
            })
            .catch(err => {
                setHasMoreItems(false);
            });
    };

    return (
        <>
            <h3>danh sach cac ten user</h3>
            <InfiniteScroll
                pageStart={-1}
                loadMore={loadItems}
                hasMore={hasMoreItems}
                loader={
                    <Spin
                        indicator={
                            <Icon type="loading" style={{ fontSize: 20 }} />
                        }
                        key={0}
                        tip="loading..."
                    />
                }
            >
                <div className="tracks">
                    <ol>
                        {tracks.map(value => (
                            <li key={value._id}>{value.name}</li>
                        ))}
                    </ol>
                </div>
            </InfiniteScroll>
        </>
    );
}