import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';

class NotFound extends Component {
    render() {
        return (
            <h1>Không tìm thấy trang này</h1>
        );
    }
}
export default withStyles(styles)(NotFound);