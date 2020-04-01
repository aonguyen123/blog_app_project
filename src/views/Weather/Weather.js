import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import { WeatherCurrent, WeatherHourly, ChartRain, WeatherDaily } from './components';
import allActions from './../../actions';

export default function Weather() {
    const currentPlace = useSelector(
        state => state.geocodeReducer.currentPlace
    );
    const weather = useSelector(state => state.geocodeReducer.weather);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(Object.keys(weather).length === 0)
        {
            if (navigator.geolocation) {
                function success(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    dispatch(
                        allActions.geocodeActions.getWeather(lat, lon, history)
                    );
                }
                function error(err) {
                    dispatch(
                        allActions.geocodeActions.getWeather(
                            37.8267,
                            -122.4233,
                            history
                        )
                    );
                }
                navigator.geolocation.getCurrentPosition(success, error);
            }
        }
    }, [dispatch, history, weather]);

    return (
        <GridContent>
            <Row gutter={[16, 16]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <WeatherCurrent
                        currentPlace={currentPlace}
                        weatherCurrent={weather.currently}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <WeatherHourly weatherHourly={weather.hourly} />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <ChartRain weatherHourly={weather.hourly} />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <WeatherDaily weatherDaily={weather.daily} />
                </Col>
            </Row>
        </GridContent>
    );
}
