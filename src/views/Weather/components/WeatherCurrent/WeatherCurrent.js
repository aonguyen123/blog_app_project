import React from 'react';
import { Card, Typography } from 'antd';
import { EnvironmentTwoTone as LocationIcon } from '@ant-design/icons';
import moment from 'moment';
import { WeatherIcon } from 'components';
import { formatMessage } from 'umi-plugin-react/locale';

export default function WeatherCurrent({ currentPlace, weatherCurrent }) {

    return (
        <Card
            title={formatMessage({id: 'weather.todayWeather'})}
            loading={weatherCurrent === undefined ? true : false}
            hoverable={true}
            size="small"
        >
            {weatherCurrent !== undefined && (
                <>
                    <LocationIcon style={{ marginRight: '8px' }} />
                    {currentPlace}
                    <div style={{ marginTop: '7px' }}>
                        <Typography>{`Ngày ${moment
                            .unix(weatherCurrent.time)
                            .format('DD-MM-YYYY')}`}</Typography>
                        <div style={{ textAlign: 'center' }}>
                            <WeatherIcon
                                icon={weatherCurrent.icon}
                                size="2rem"
                            />

                            <Typography>{weatherCurrent.summary}</Typography>
                            <Typography>{`Nhiệt độ ${Math.round(weatherCurrent.temperature)} ℃`}</Typography>
                            <Typography>{`Cảm thấy như ${Math.round(weatherCurrent.apparentTemperature)} ℃`}</Typography>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
}
