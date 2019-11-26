import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer';
import HomePageContainer from '../containers/HomePageContainer';
import UpdateUserInfor from "../containers/UserContainer";
import ChangePassContainer from "../containers/ChangePasswordContainer";

const Root = () => (
    <Router>
        <Switch>
            <Route path="/register">
                <RegisterContainer/>
            </Route>
            <Route path="/login">
                <LoginContainer/>
            </Route>
            <Route path="/home">
                <HomePageContainer/>
            </Route>
            <Route path="/infor">
                <UpdateUserInfor/>
            </Route>
            <Route path="/changePassword">
                <ChangePassContainer/>
            </Route>
        </Switch>
    </Router>
);

export default Root
