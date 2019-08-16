import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import TaskItem from './../../components/taskItem/index';

class TaskList extends Component {
    render() {
        const { classes, tasks, value } = this.props;
        const { label } = value;
        return (
            <Grid item md={4} xs={12}>
                <Box mt={3} mb={2}>
                    <div className={classes.status}>{value.label}</div>
                </Box>
                <div className={classes.wraperListTask}>
                    {
                        tasks.map((value, key) => {
                            return <TaskItem task={value} label={label} key={key}/>
                        })
                    }
                </div>
            </Grid>
        );
    }
}
export default withStyles(styles)(TaskList);