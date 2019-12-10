import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Col, Layout, Row } from 'antd';
import LoginContainer from './Login/LoginContainer';
import RegisterContainer from './Register/RegisterContainer';
import ManagementTutorContriner from './ManagementOfTutor/ManagementTutorContainer';
import ManagementHirerContainer from './ManagementOfHirer/ManagementHirerContainer';
import NavBarContriner from './Common/NavBar/NavBarContainer';
import Home from './Home/Home';

const { Content } = Layout;

function Root() {
  return (
    <BrowserRouter>
      <Layout style={{ textAlign: 'center', backgroundColor: 'white' }}>
        <NavBarContriner/>
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            <Content
              style={{
                padding: '0px 0px',
                margin: '10px 0px',
                backgroundColor: 'white'
              }}
            >
              <Route exact path="/" component={Home}/>
              <Route exact path="/home" component={Home}/>
              <Route path="/register" component={RegisterContainer}/>
              <Route path="/login" component={LoginContainer}/>
              <Route
                path="/tutor-manage"
                component={ManagementTutorContriner}
              />
              <Route
                path="/hirer-manage"
                component={ManagementHirerContainer}
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
