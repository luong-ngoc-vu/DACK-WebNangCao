import React from 'react';

import { Layout } from 'antd';

import { Route } from 'react-router-dom';
import ProfileHirerContainer from './ProfileHirer/ProfileHirerContainer';
import SideBarHirer from './SideBarHirer/SideBarHirer';
import ChangePasswordContainer from '../ChangePassword/ChangePasswordContainer';
import OrderContract from './OrderContract/OrderContract';

const { Content } = Layout;

class ManagementHirer extends React.Component {
  render() {
    return (
      <div>
        <Layout style={{ padding: '15px 0px', backgroundColor: 'white' }}>
          <SideBarHirer />
          <Content
            style={{
              backgroundColor: 'white',
              padding: '0 0px',
              minHeight: 280,
              background: '#fff',
              marginLeft: '10px',
              boxShadow: '0px 1px 6px 0px rgba(57, 73, 76, 0.35)'
            }}
          >
            <Route
              path="/hirer-manage/profile"
              component={ProfileHirerContainer}
            ></Route>
            <Route
              path="/hirer-manage/change-password"
              component={ChangePasswordContainer}
            ></Route>
            <Route
              path="/hirer-manage/manage-contract"
              component={OrderContract}
            ></Route>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default ManagementHirer;
