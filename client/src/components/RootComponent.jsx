// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import RegisterContainer from '../components/Register/RegisterContainer';
// import LoginContainer from '../components/Login/LoginContainer';
// import NavBarContainer from '../components/Common/NavBar/NavBarContainer';
// import UpdateUserInformationContainer from '../components/UpdateUserInformation/UpdateUserContainer';
// import ChangePasswordContainer from '../components/ChangePassword/ChangePasswordContainer';

// const Root = () => (
//   <Router>
//     <Switch>
//       <Route path="/register">
//         <RegisterContainer />
//       </Route>
//       <Route path="/login">
//         <LoginContainer />
//       </Route>
//       <Route path="/home">
//         <NavBarContainer />
//       </Route>
//       <Route path="/infor">
//         <UpdateUserInformationContainer />
//       </Route>
//       <Route path="/changePassword">
//         <ChangePasswordContainer />
//       </Route>
//     </Switch>
//   </Router>
// );

// export default Root;

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout, Row, Col } from 'antd';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import ManagementTutor from './ManagementOfTutor/ManagementTutor';
import ManagementHirer from './ManagementOfHirer/ManagementHirer';
import NavBar from './Common/NavBar/NavBar';

const { Content } = Layout;

function Root() {
  return (
    <BrowserRouter>
      <Layout style={{ textAlign: 'center' }}>
        {/* Header */}
        <NavBar />
        {/* Content */}
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            <Content style={{ padding: '5px 0px' }}>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/tutor-profile" component={ManagementTutor} />
              <Route path="/student-profile" component={ManagementHirer} />
            </Content>
          </Col>
          <Col span={3}></Col>
        </Row>
      </Layout>
    </BrowserRouter>
  );
}

export default Root;
