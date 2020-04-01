import React from 'react';
import { Card, Typography } from 'antd';
import { Bar } from 'ant-design-pro/lib/Charts';
import moment from 'moment';

export default function ChartRain({ weatherHourly }) {
    const renderChart = () => {
        if (weatherHourly !== undefined) {
            const { data } = weatherHourly;
            const salesData = [];
            for (let i = 0; i < data.length; i ++) {
                if(i > 11 ) break;
                else {
                    salesData.push({
                        x: moment.unix(data[i].time).format('HH:mm'),
                        y: Math.round(data[i].precipIntensity * 100) / 100
                    });
                }
            }
            return <Bar height={250} data={salesData} title={<Typography>{weatherHourly.summary}</Typography>} />;
        }
    };

    return (
        <Card
            size="small"
            title="Hourly rain"
            hoverable={true}
            loading={weatherHourly === undefined ? true : false}
        >
            {/* {weatherHourly !== undefined && (
                <Typography>{weatherHourly.summary}</Typography>
            )} */}
            {renderChart()}
        </Card>
    );
}
