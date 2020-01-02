import React, { Component, Fragment } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import Navbar from './../../../components/navBar/NavBar';
import { logoutUser, getUser } from './../../../actions/authentication';

class Home extends Component {
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };
    componentDidMount() {
        if(!this.props.auth.isAuthenticated)
        {
            this.props.history.push('/signin');
        }
    }
    handleClick = () => {
        this.props.getUser();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        
        return (
            <Fragment>
                <Navbar logoutUser={() => this.handleLogout()} />
                <h1>huhuuh</h1>
                <h1>huhuuh</h1>
                <h1>huhuuh</h1>
                <h1>huhuuh</h1>
                <h1>huhuuh</h1>
                <h1>huhuuh</h1>
                <Button color="secondary" onClick={this.handleClick}>click me</Button>
            </Fragment>
        );
    }
}
Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};
const mapStateToProps = state => ({
    auth: state.auth,
    currentUser: state.currentUser
});
export default connect(
    mapStateToProps,
    { logoutUser, getUser }
)(withStyles(styles)(withRouter(Home)));
