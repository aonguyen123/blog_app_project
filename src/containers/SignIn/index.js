import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import FacebookLogin from 'react-facebook-login';

class SignIn extends Component {
    responseFacebook = (res) => {
        console.log(res);
    }
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="https://www.c-sharpcorner.com/article/facebook-login-setup-in-net-core2-0-step-by-step-guide/Images/image001.png"
                        title="Login via facebook"
                    />
                </CardActionArea>
                <CardActions>
                    <FacebookLogin
                        appId="355050868777105"
                        autoLoad={true}
                        fields="name,email,picture, birthday"
                        callback={this.responseFacebook}
                        cssClass="my-facebook-button-class"
                        icon="fa-facebook"
                    />
                </CardActions>
            </Card>
        );
    }
}
export default withStyles(styles)(SignIn);
