import React, {PureComponent} from 'react';
import {Redirect, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import '../App.css';

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
                        <Typography className="user-name" style={{align: "inherit"}}>Xin chào, {st.name}</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
