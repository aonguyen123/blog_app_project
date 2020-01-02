import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './../../../components/login/Login';
import { loginUser } from './../../../actions/authentication';
import PropTypes from 'prop-types';
import TopLoading from './../../../components/topLoading/TopLoading';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            loadingTop: false,
            loadingButton: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        this.setState({
            loadingTop: true,
            loadingButton: true
        });
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user, this.props.history);
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                loadingTop: false,
                loadingButton: false
            });
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    render() {
        const { errors, loadingTop, loadingButton } = this.state;
        return (
            <React.Fragment>
                {loadingTop && <TopLoading />}
                <Login
                    handleChange={e => this.handleChange(e)}
                    handleSubmit={e => this.handleSubmit(e)}
                    errors={errors}
                    loadingButton={loadingButton}
                />
            </React.Fragment>
        );
    }
}
SignIn.propTypes = {
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(SignIn));
