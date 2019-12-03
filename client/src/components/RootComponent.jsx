// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Col, Layout, Row } from 'antd';
import LoginContainer from './Login/LoginContainer';
import RegisterContainer from './Register/RegisterContainer';
import ManagementTutor from './ManagementOfTutor/ManagementTutor';
import ManagementHirer from './ManagementOfHirer/ManagementHirer';
import ManagementHirerPassword from './ManagementOfHirer/ManagementHirerPassword';
import NavBarContriner from './Common/NavBar/NavBarContainer';
import Home from './Home/Home';

const { Content } = Layout;

function Root() {
  return (
    <BrowserRouter>
      <Layout style={{ textAlign: 'center' }}>
        <NavBarContriner />
        <Row style={{ backgroundColor: 'white' }}>
          <Col span={3}></Col>
          <Col span={18}>
            <Content style={{ padding: '5px 0px' }}>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/register" component={RegisterContainer} />
              <Route path="/login" component={LoginContainer} />
              <Route path="/tutor-profile" component={ManagementTutor} />
              <Route path="/student-profile" component={ManagementHirer} />
              <Route
                path="/change-password"
                component={ManagementHirerPassword}
              />
            </Content>
          </Col>
          <Col span={3}></Col>
        </Row>
      </Layout>
    </BrowserRouter>
  );
}

export default Root;
