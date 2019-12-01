// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Col, Layout, Row} from 'antd';
import {Login} from './Login/Login';
import RegisterContainer from './Register/RegisterContainer';
import ManagementTutor from './ManagementOfTutor/ManagementTutor';
import ManagementHirer from './ManagementOfHirer/ManagementHirer';
import NavBar from './Common/NavBar/NavBar';

const {Content} = Layout;

function Root() {
    return (
        <BrowserRouter>
            <Layout style={{textAlign: 'center'}}>
                <NavBar/>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Content style={{padding: '5px 0px'}}>
                            <Route exact path="/" component={Login}/>
                            <Route path="/register" component={RegisterContainer}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/tutor-profile" component={ManagementTutor}/>
                            <Route path="/student-profile" component={ManagementHirer}/>
                        </Content>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </Layout>
        </BrowserRouter>
    );
}

export default Root;
