import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'antd'
import { getInfo } from './../../actions';

function About(props) {
    const { getInfo, history } = props;

    useEffect(() => {
        getInfo(history);
    }, [getInfo, history]);

    return (
        <>
            <DatePicker />
            <h1>about</h1>
        </>
    )
}

const mapStateToProps = state => ({
    info: state.auth
});
export default connect(mapStateToProps, {getInfo})(About);