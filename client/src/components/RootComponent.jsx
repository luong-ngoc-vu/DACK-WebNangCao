import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import RegisterContainer from '../components/Register/RegisterContainer';
import LoginContainer from '../components/Login/LoginContainer';
import NavBarContainer from '../components/NavBar/NavBarContainer';
import UpdateUserInformationContainer from "../components/UpdateUserInformation/UpdateUserContainer";
import ChangePasswordContainer from "../components/ChangePassword/ChangePasswordContainer";

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
                <NavBarContainer/>
            </Route>
            <Route path="/infor">
                <UpdateUserInformationContainer/>
            </Route>
            <Route path="/changePassword">
                <ChangePasswordContainer/>
            </Route>
        </Switch>
    </Router>
);

export default Root
