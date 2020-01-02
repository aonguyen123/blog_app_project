import React, { Component, Fragment } from 'react';
import Register from './../../../components/register/Register';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from './../../../actions/authentication';
import PropTypes from 'prop-types';
import TopLoading from './../../../components/topLoading/TopLoading';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
            loadingButton: false,
            loadingTop: false
        }; 
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        this.setState({
            loadingButton: true,
            loadingTop: true
        });
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.registerUser(user, this.props.history);
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                loadingButton: false,
                loadingTop: false
            });
        }
    }
    componentDidMount() {
        if(this.props.auth.isAuthenticated)
        {
            this.props.history.push('/')
        }
    }
    render() {
        const { errors, loadingButton, loadingTop } = this.state;
        return (
            <Fragment>
                {loadingTop && <TopLoading />}
                <Register
                    handleChange={e => this.handleChange(e)}
                    handleSubmit={e => this.handleSubmit(e)}
                    errors={errors}
                    loadingButton={loadingButton}
                />
            </Fragment>
        );
    }
}
SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(SignUp));
