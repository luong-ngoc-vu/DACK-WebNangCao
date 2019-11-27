import React from 'react';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../../App.css';

export default class UpdateUser extends React.PureComponent {
    constructor() {
        super();
        this.username = '';
        this.name = '';
        this.email = '';
        this.phone = '';
        this.image = '';
        this.err = '';
    }

    render() {
        const st = this.props;

        this.name = st.name;
        this.email = st.email;
        this.phone = st.phone;
        this.image = st.image;

        if (!st.isLogin) {
            return <Redirect to="/login"/>;
        }
        return (
            <div className="loginLayout">
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className="paper">
                        <center>
                            <Typography component="h1" variant="h5">
                                Update User Information
                            </Typography>
                            <Avatar className="avatar1" alt="Remy Sharp" src={st.image}
                                    style={{
                                        maxWidth: '100px',
                                        maxHeight: '100px',
                                        minWidth: '100px',
                                        minHeight: '100px',
                                    }}/>
                        </center>
                        <form className="form" noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        defaultValue={st.username}
                                        label="Username"
                                        name="username"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        defaultValue={st.name}
                                        onChange={event => {
                                            this.name = event.target.value;
                                        }}
                                        label="Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="phone"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        id="phone"
                                        defaultValue={st.phone}
                                        onChange={event => {
                                            this.phone = event.target.value;
                                        }}
                                        label="Phone"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        defaultValue={st.email}
                                        onChange={event => {
                                            this.email = event.target.value;
                                        }}
                                        label="Email"
                                        name="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="image"
                                        id="image"
                                        required
                                        variant="outlined"
                                        label="Image"
                                        defaultValue={st.image}
                                        onChange={event => {
                                            this.image = event.target.value;
                                        }}
                                    />
                                    <div className="wrap">
                                        <Button className="btn">Change Avatar</Button>
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={async e => {
                                                const {files} = e.target;
                                                const data = new FormData();
                                                data.append('file', files[0]);
                                                data.append('upload_preset', 'jq0gfqp1');
                                                data.append("api_key", "725237476677898");
                                                data.append("api_secret", '5bN8m-49GwuIPffqiipf20h9eLI');

                                                const res = await fetch('https://api.cloudinary.com/v1_1/dtrty0qol/image/upload', {
                                                    method: 'POST',
                                                    body: data
                                                });
                                                const file = await res.json();
                                                this.image = file.url;
                                                console.log(this.image);
                                            }}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="Error">{this.err}</div>
                            <div className="GridForm">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        st.updateUser(st.username, this.name, this.phone, this.email, this.image);
                                        this.err = 'Update User Information Successfully';
                                    }}>
                                    Update
                                </Button>
                            </div>

                            <div className="GridForm">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        window.location.href = '/changePassword';
                                    }}
                                >
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </div>
                </Container>
                <div className="user-info">
                    <Button
                        className="back-home"
                        color="primary"
                        onClick={() => {
                            window.location.href = '/home';
                        }}
                    >
                        Back to homepage
                    </Button>
                </div>
            </div>
        );
    }
}
