import React, {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import '../App.css';
import Button from "@material-ui/core/Button";


export default class HomePage extends PureComponent {
    render() {
        const st = this.props;

        if (st.isLogin === false) {
            return <Redirect to="/login"/>;
        }
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className="title">
                            Website thuê gia sư 2020
                        </Typography>
                        <Typography className="user-name" style={{align: "inherit"}}>Hello, {st.name}</Typography>
                        <Avatar src={st.image} className="avatar"/>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={e => {
                                e.preventDefault();
                                st.logOut();
                            }}
                        >
                            Logout
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={() => {
                                window.location.href = './infor';
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={() => {
                                window.location.href = './changePassword';
                            }}
                        >
                            Change
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
