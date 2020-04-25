import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, List } from 'antd';
import moment from 'moment';
import { ScrollToBottomCom } from './../../../../components';
import allActions from '../../../../actions';

export default function ToolChat() {
    const statusChats = useSelector(state => state.chatsReducer.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.chatsActions.getStatusChats());
    }, [dispatch]);

    return (
        <>
            <Card
                size="small"
                hoverable={true}
            >
                <ScrollToBottomCom height="225px" width="100%">
                    <List
                        dataSource={statusChats}
                        size="small"
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    description={
                                        <p style={{ margin: 0, padding: 0 }}>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                {item.displayName}
                                            </span>{' '}
                                            {item.text}{' '}
                                            {item.target && (
                                                <span
                                                    style={{
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {item.target}
                                                </span>
                                            )}{' '}
                                            at{' '}
                                            {moment(item.createdAt).format(
                                                'DD/MM/YYYY, HH:mm a'
                                            )}
                                        </p>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </ScrollToBottomCom>
            </Card>
        </>
    );
}
