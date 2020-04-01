import React from 'react';
import { Card, Typography, Table } from 'antd';
import { WeatherIcon } from './../../../../components';
import moment from 'moment';
import './styles.css';

export default function WeatherDaily({ weatherDaily }) {

    const columns = [
        { title: '', dataIndex: 'icon', key: 'icon' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Low', dataIndex: 'low', key: 'low' },
        { title: 'High', dataIndex: 'high', key: 'high' },
        { title: 'Wind', dataIndex: 'wind', key: 'wind' }
    ];
    const renderTableData = () => {
        if (weatherDaily !== undefined) {
            const chartData = [];
            const { data } = weatherDaily;
            for (let i = 0; i < data.length; i++) {
                chartData.push({
                    key: i,
                    icon: <WeatherIcon icon={data[i].icon} size="2rem" />,
                    date: moment.unix(data[i].time).format('dddd'),
                    low: `${Math.round(data[i].temperatureLow)} ℃`,
                    high: `${Math.round(data[i].temperatureHigh)} ℃`,
                    wind: `${Math.round(data[i].windSpeed * 3.6)} kph`,
                    description: (
                        <>
                            <span className='description-weatherdaily'>
                                {`Sunrise ${moment
                                    .unix(data[i].sunriseTime)
                                    .format('HH:mm')}`}
                            </span>
                            <span className='description-weatherdaily'>
                                {`Sunset ${moment
                                    .unix(data[i].sunsetTime)
                                    .format('HH:mm')}`}
                            </span>
                            <span className='description-weatherdaily'>
                                {`Rain ${data[i].precipIntensity.toFixed(
                                    2
                                )} mm / ${Math.round(
                                    data[i].precipProbability * 100
                                )} %`}
                            </span>
                        </>
                    )
                });
            }
            return (
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => (
                            <p style={{ margin: 0 }}>{record.description}</p>
                        )
                    }}
                    dataSource={chartData}
                    pagination={false}
                    size="small"
                />
            );
        }
        return null;
    };

    return (
        <Card
            title="8 days forecast"
            size="small"
            loading={weatherDaily === undefined ? true : false}
            hoverable
        >
            {weatherDaily !== undefined && (
                <Typography>{weatherDaily.summary}</Typography>
            )}
            {renderTableData()}
        </Card>
    );
};
