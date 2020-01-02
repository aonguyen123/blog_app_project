import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -8,
        marginLeft: -12
    }
}));

const ButtonLoading = props => {
    const classes = useStyles();
    return (
        <CircularProgress
            size={24}
            className={classes.buttonProgress}
            color="secondary"
        />
    );
};
ButtonLoading.propTypes = {
    classes: PropTypes.object
};
export default ButtonLoading;
