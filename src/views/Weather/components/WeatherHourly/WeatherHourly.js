import React from 'react';
import { Card, Typography } from 'antd';
import { TimelineChart } from 'ant-design-pro/lib/Charts';

import moment from 'moment';

export default function WeatherHourly({ weatherHourly }) {

    const renderChart = () => {
        if (weatherHourly !== undefined) {
            const chartData = [];
            const { data } = weatherHourly;
            for (let i = 0; i < data.length; i++) {
                if (i > 11) break;
                else {
                    chartData.push({
                        x: moment.unix(data[i].time)._i,
                        y1: Math.round(data[i].temperature)
                    });
                }
            }
            return (
                <TimelineChart
                    height={200}
                    data={chartData}
                    titleMap={{ y1: 'Temperature (℃)' }}
                />
            );
        }
    };

    return (
        <Card
            size="small"
            title="Hourly temperature"
            hoverable={true}
            loading={weatherHourly === undefined ? true : false}
        >
            {weatherHourly !== undefined && (
                <Typography>{weatherHourly.summary}</Typography>
            )}
            {renderChart()}
        </Card>
    );
}
