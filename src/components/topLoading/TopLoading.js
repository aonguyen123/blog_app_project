import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import { ColorLine, styles } from './styles';

const ColorLinearProgress = withStyles(ColorLine)(LinearProgress);

class TopLoading extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ColorLinearProgress
                    className={classes.top}
                    variant="indeterminate"
                />
                <CircularProgress
                    className={classes.customColor}
                    variant="indeterminate"
                    size={24}
                    thickness={4}
                />
            </div>
        );
    }
}
export default withStyles(styles)(TopLoading);
