import React from 'react';

import { Layout } from 'antd';

import { Route } from 'react-router-dom';
import ProfileHirerContainer from './ProfileHirer/ProfileHirerContainer';
import SideBarHirer from './SideBarHirer/SideBarHirer';
import ChangePasswordContainer from '../ChangePassword/ChangePasswordContainer';

import ManageContract from './ManageContract/ManageContract';
import Chat from '../Chat/Chat';
import ManageChat from './ManageChat/ManageChat';
import MoneyManagement from "../MoneyManagement/MoneyManagement";

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
						<Route path="/hirer-manage/profile" component={ProfileHirerContainer} />
						<Route path="/hirer-manage/change-password" component={ChangePasswordContainer} />
						<Route path="/hirer-manage/money-management" component={MoneyManagement} />
						<Route path="/hirer-manage/manage-contract" component={ManageContract} />
						<Route path="/hirer-manage/chat" component={ManageChat} />
					</Content>
				</Layout>
			</div>
		);
	}
}

export default ManagementHirer;
