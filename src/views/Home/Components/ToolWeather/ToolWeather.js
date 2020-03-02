import React, { useState, useEffect } from 'react';
import { Card, Icon, Result } from 'antd';
import { ChartCard, MiniArea } from 'ant-design-pro/lib/Charts';
import moment from 'moment';

export default function ToolWeather(props) {
    const { geocode, errors } = props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (geocode || errors.message) && setLoading(false);
    }, [geocode, errors.message]);

    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
        visitData.push({
            x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
                'YYYY-MM-DD'
            ),
            y: Math.floor(Math.random() * 100) + 10
        });
    }

    return (
        <Card
            size="small"
            loading={loading}
            title="Today weather"
        >
            {errors.message ? (
                <Result
                    icon={<Icon type="warning" />}
                    title={errors.message}
                />
            ) : (
                <ChartCard title={geocode} contentHeight={282} bordered={false}>
                    <MiniArea line height={75} data={visitData} />
                </ChartCard>
            )}
        </Card>
    );
}
