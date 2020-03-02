import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd'
import allActions from './../../actions';

function About(props) {
    const { history } = props;
    const info = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.authenticatedActions.getInfo(history));
    }, [history, dispatch]);

    return (
        <>
            <DatePicker />
            <h1>about</h1>
        </>
    )
}

export default About;