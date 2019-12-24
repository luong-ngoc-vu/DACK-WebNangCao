import React from 'react';
import { Layout } from 'antd';

import { Route } from 'react-router-dom';
import ProfileTutorContainer from './ProfileTutor/ProfileTutorContainer';
import SideBarTutor from './SideBarTutor/SideBarTutor';
import ChangePasswordContainer from '../ChangePassword/ChangePasswordContainer';
import ManageContract from '../ManagementOfTutor/ManageContract/ManageContract';
import Chat from '../Chat/Chat';
import ManageChat from './ManageChat/ManageChat';
import ManageRevenue from './ManageRevenue/ManageRevenue';

const { Content } = Layout;

class ManagementTutor extends React.Component {
  render() {
    return (
      <div>
        <Layout style={{ padding: '15px 0px', backgroundColor: 'white' }}>
          <SideBarTutor />
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
              path="/tutor-manage/profile"
              component={ProfileTutorContainer}
            />
            <Route
              path="/tutor-manage/change-password"
              component={ChangePasswordContainer}
            />
            <Route
              path="/tutor-manage/manage-contract"
              component={ManageContract}
            />
            <Route path="/tutor-manage/chat" component={ManageChat} />
            <Route path="/tutor-manage/revenue" component={ManageRevenue} />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default ManagementTutor;
