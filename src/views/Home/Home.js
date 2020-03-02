import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { ToolPost, ListContent, ToolWeather } from './Components';
import allActions from './../../actions';

function Home(props) {
    const { history } = props;
    const geocode = useSelector(state => state.currentPlace.geocode);
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();

    useEffect(() => {
        if(navigator.geolocation)
        {
            function success(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                dispatch(allActions.geocodeActions.getCurrentPlace(lat, lon, history));
            }
            function error(err) {
                dispatch(allActions.geocodeActions.getCurrentPlace(37.8267, -122.4233, history));
            }
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }, [dispatch, history])
    
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col lg={10} md={10}>
                    <ToolPost />
                </Col>
                <Col lg={14} md={14} sm={24}>
                    <ToolWeather 
                        geocode={geocode} 
                        errors={errors}
                    />
                </Col>
            </Row>
            <Row gutter={[20, 20]}>
                <Col>
                    <ListContent />
                </Col>
            </Row>
        </>
    );
}
export default Home;
