import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ButtonLoading from './../buttonLoading/ButtonLoading';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    text: {
        textDecoration: 'none',
        color: '#0d47a1'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    }
}));

const Register = props => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                autoFocus
                                onChange={props.handleChange}
                                error={props.errors.name ? true : false}
                                helperText={
                                    props.errors.name
                                        ? `${props.errors.name}`
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={props.handleChange}
                                error={props.errors.email ? true : false}
                                helperText={
                                    props.errors.email
                                        ? `${props.errors.email}`
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password_comfirm"
                                autoComplete="current-password"
                                onChange={props.handleChange}
                                error={props.errors.password ? true : false}
                                helperText={
                                    props.errors.password
                                        ? `${props.errors.password}`
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirm"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={props.handleChange}
                                error={
                                    props.errors.password_confirm ? true : false
                                }
                                helperText={
                                    props.errors.password_confirm
                                        ? `${props.errors.password_confirm}`
                                        : null
                                }
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={props.loadingButton}
                            onClick={props.handleSubmit}
                        >
                            Sign Up
                        </Button>
                        {props.loadingButton && <ButtonLoading />}
                    </div>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link className={classes.text} to="/signin">
                                {'Already have an account? Sign in'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
export default Register;
