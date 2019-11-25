import React from 'react';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../App.css';

export default class Login extends React.Component {
    constructor() {
        super();
        this.username = '';
        this.password = '';
        this.err = '';
    }

    render() {
        const st = this.props;
        if (st.isLogin) {
            return <Redirect to="/home"/>;
        }
        return (
            <div className="loginLayout">
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className="paper">
                        <center>
                            <Avatar className="avatar1">
                                <LockOutlinedIcon className="LockOutlinedIcon"/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                        </center>
                        <form className="form" noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={event => {
                                    this.username = event.target.value;
                                }}
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={event => {
                                    this.password = event.target.value;
                                }}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"

                            />

                            <div className="Error">{this.err}</div>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={event => {
                                    event.preventDefault();
                                    st.Login(this.username, this.password);
                                }}
                            >
                                Sign In
                            </Button>
                            <div
                                style={{display: 'flex', flexWrap: 'wrap'}}
                            >
                            </div>
                            <Grid className="footer-login" container>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        Don&apos;t have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }
}
