import React from 'react';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../App.css';


export default class ChangePass extends React.PureComponent {
    constructor() {
        super();
        this.password = "";
        this.newpassword = "";
    }

    render() {
        const st = this.props;

        if (!st.isLogin) {
            return <Redirect to="/login"/>;
        }

        return (
            <div className="loginLayout">
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className="paper">
                        <center>
                            <Avatar className="avatar1">
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Change Password
                            </Typography>
                        </center>
                        <form className="form" noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="password"
                                        type="password"
                                        onChange={event => {
                                            this.password = event.target.value;
                                        }}
                                        label="Current Password"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField

                                        name="newpassword"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="newpassword"
                                        type="password"
                                        onChange={event => {
                                            this.newpassword = event.target.value;
                                        }}
                                        label="New Password"
                                    />
                                </Grid>

                            </Grid>
                            <div className="Error">{this.err}</div>
                            <div className="GridForm">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={event => {
                                        event.preventDefault();
                                        st.changePass(st.username, st.password, this.newpassword);
                                        this.err = "Update Password Successfully"
                                    }}>
                                    Change Password
                                </Button>
                            </div>

                        </form>
                    </div>
                </Container>
                <div className="user-info">
                    <Button className='back-home' color='primary' onClick={() => {
                        window.location.href = '/home'
                    }}>Back to homepage</Button>
                </div>
            </div>
        );
    }
}
