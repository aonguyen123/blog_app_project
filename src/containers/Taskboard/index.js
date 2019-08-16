import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { STATUS } from '../../constants';
import TaskList from './../../components/taskList/index';
import TaskForm from './../../components/taskForm/index';
import PropTypes from 'prop-types';

const listTask = [
    {
        id: 1,
        title: 'Read book',
        description: 'Read masterial ui book',
        status: 0
    },
    {
        id: 2,
        title: 'Play football',
        description: 'With my friend',
        status: 2
    },
    {
        id: 3,
        title: 'Study NodeJS',
        description: '',
        status: 1
    }
];
class Taskboard extends Component {
    state = {
        open: false
    };

    renderBoard = () => {
        let xhtml = null;
        xhtml = (
            <Grid container spacing={2}>
                {STATUS.map(value => {
                    const taskFilter = listTask.filter(
                        task => task.status === value.value
                    );
                    return (
                        <TaskList
                            tasks={taskFilter}
                            value={value}
                            key={value.value}
                        />
                    );
                })}
            </Grid>
        );
        return xhtml;
    };
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    renderForm = () => {
        const { open } = this.state;
        let xhtml = null;
        xhtml = <TaskForm open={open} onClose={this.handleClose} />;
        return xhtml;
    };
    openForm = () => {
        this.setState({
            open: true
        });
    };
    render() {
        const { classes } = this.props;
        console.log(this.props);
        return (
            <div className={classes.taskboard}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.openForm}
                >
                    <AddIcon /> Thêm mới công việc
                </Button>
                {this.renderBoard()}
                {this.renderForm()}
            </div>
        );
    }
}

Taskboard.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(Taskboard);
