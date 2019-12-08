// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Col, Layout, Row } from 'antd';
import LoginContainer from './Login/LoginContainer';
import RegisterContainer from './Register/RegisterContainer';
import ManagementTutorContriner from './ManagementOfTutor/ManagementTutorContainer';
import ManagementHirerContainer from './ManagementOfHirer/ManagementHirerContainer';
import NavBarContriner from './Common/NavBar/NavBarContainer';
import ChangePasswordContainer from './ChangePassword/ChangePasswordContainer';
import Home from './Home/Home';

const { Content } = Layout;

function Root() {
  return (
    <BrowserRouter>
      <Layout style={{ textAlign: 'center', padding: '0' }}>
        <NavBarContriner />
        <Row style={{ backgroundColor: 'white', padding: 0 }}>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Col span={3}></Col>
          <Col span={18}>
            <Content style={{ padding: '10px 0px' }}>
              <Route path="/register" component={RegisterContainer} />
              <Route path="/login" component={LoginContainer} />
              <Route
                path="/tutor-profile"
                component={ManagementTutorContriner}
              />
              <Route
                path="/student-profile"
                component={ManagementHirerContainer}
              />
              <Route
                path="/change-password"
                component={ChangePasswordContainer}
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
