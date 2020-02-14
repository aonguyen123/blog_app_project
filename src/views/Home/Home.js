import React, { lazy, Suspense, useEffect } from 'react';
import { Row, Col } from 'antd';
//import { GlobalLoading } from './../../components';
import { ToolPost, ListContent, ToolWeather } from './Components';
import './styles.css';

function Home(props) {

    useEffect(() => {
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((posi) => {
                const lat = posi.coords.latitude;
                const long = posi.coords.longitude;
                console.log(lat, long)
            })
        }
    })
    
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col lg={10} md={10}>
                    <ToolPost />
                </Col>
                <Col lg={14} md={14} sm={24}>
                    <ToolWeather />
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
