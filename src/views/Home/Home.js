import React from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, Alert, Spin } from 'antd';

function Home(props) {
    return (
        <>
            <h1>Home</h1>
            <Link to="/about">about</Link>
            <br />
            <DatePicker />
        </>
    );
}
export default Home;
