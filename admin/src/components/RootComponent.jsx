import React from 'react';

import { Breadcrumb, Layout } from 'antd';
import 'antd/dist/antd.css';
import '../App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import SideBar from '../components/Menu/SideBar/SideBar';
import SlideBarAdmin from '../components/Menu/SideBar/SlideBarAdmin';
import NavBarContainer from '../components/Menu/NavBar/NavBarContainer';
import ViewListAdmin from './ViewListAdmin/ViewListAdmin';
import ViewListSkillContainer from './ViewListSkill/ViewListSkillContainer';
import ViewListUserContainer from './ViewListUsers/ViewListUsersContainer';
import ViewDetailUserContainer from './ViewDetailUser/ViewDetailUserContainer';
import ViewDetailSkillContainer from './ViewDetailSkill/ViewDetailSkillContainer';
import CreateSkillContainer from './CreateSkill/CreateSkillContainer';
import CreateAdminContainer from '../components/CreateAdmin/CreateAdminContainer';
import LoginContainer from '../components/LoginAdmin/LoginContainer';
import ViewListContract from './ViewListContract/ViewListContract';
import ViewDetailContract from './ViewDetailContract/ViewDetailContract';
import ViewListComplaint from './ViewListComplaint/ViewListComplaint';
import DashBoard from './Dashboard/DashBoard';
import StatisticAndRevenue from './ViewStatisticAndRevenue/StatisticAndRevenue';

const { Content } = Layout;

class App extends React.PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Route exact path="/" component={LoginContainer} />
				<Route path="/admin-login" component={LoginContainer} />
				<Route path="/admin-root">
					<Layout style={{ height: '100vh' }}>
						<SideBar />
						<Layout>
							<NavBarContainer />
							<Layout style={{ padding: '0 24px 24px' }}>
								<Breadcrumb style={{ margin: '16px 0' }}>
									<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
									<Route path="/admin-root/dashboard">
										<Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
										<Breadcrumb.Item>Tạo tài khoản member</Breadcrumb.Item>
									</Route>
									<Route path="/admin-root/admins">
										<Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
										<Breadcrumb.Item>Xem danh sách member</Breadcrumb.Item>
									</Route>
								</Breadcrumb>
								<Content
									style={{
										background: '#fff',
										padding: 24,
										margin: 0,
										minHeight: 280
									}}
								>
									<Route exact path="/admin-root">
										<CreateAdminContainer />
									</Route>
									<Route path="/admin-root/dashboard" component={CreateAdminContainer} />
									<Route path="/admin-root/admins" component={ViewListAdmin} />
								</Content>
							</Layout>
						</Layout>
					</Layout>
				</Route>
				<Route path="/admin-normal">
					<Layout style={{ height: '100vh' }}>
						<SlideBarAdmin />
						<Layout>
							<NavBarContainer />
							<Layout style={{ padding: '0 24px 24px' }}>
								<Breadcrumb style={{ margin: '16px 0' }}>
									<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
									<Route path="/admin-normal/view-list-user">
										<Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
										<Breadcrumb.Item>Xem danh sách người dùng</Breadcrumb.Item>
									</Route>
									<Route path="/admin-normal/detailUser">
										<Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
										<Breadcrumb.Item>Xem chi tiết người dùng</Breadcrumb.Item>
									</Route>

									<Route path="/admin-normal/skills">
										<Breadcrumb.Item>Quản lý kĩ năng</Breadcrumb.Item>
										<Breadcrumb.Item>Xem danh sách kĩ năng</Breadcrumb.Item>
									</Route>

									<Route path="/admin-normal/contract">
										<Breadcrumb.Item>Quản lý hợp đồng</Breadcrumb.Item>
										<Breadcrumb.Item>Xem danh sách hợp đồng</Breadcrumb.Item>
									</Route>
									<Route path="/admin-normal/detailContract">
										<Breadcrumb.Item>Quản lý hợp đồng</Breadcrumb.Item>
										<Breadcrumb.Item>Xem chi tiết hợp đồng</Breadcrumb.Item>
									</Route>
									<Route path="/admin-normal/complaint">
										<Breadcrumb.Item>Quản lý hợp đồng</Breadcrumb.Item>
										<Breadcrumb.Item>Danh sách khiếu nại</Breadcrumb.Item>
									</Route>
								</Breadcrumb>
								<Content
									style={{
										background: '#fff',
										padding: 24,
										margin: 0,
										minHeight: 'auto'
									}}
								>
									<Route path="/admin-normal/view-dashBoard" component={DashBoard} />
									<Route path="/admin-normal/view-list-user" component={ViewListUserContainer} />
									<Route path="/admin-normal/detailUser" component={ViewDetailUserContainer} />
									<Route path="/admin-normal/createSkill" component={CreateSkillContainer} />
									<Route path="/admin-normal/skills" component={ViewListSkillContainer} />
									<Route path="/admin-normal/detailSkill" component={ViewDetailSkillContainer} />
									<Route path="/admin-normal/contract" component={ViewListContract} />
									<Route path="/admin-normal/detailContract" component={ViewDetailContract} />
									<Route path="/admin-normal/complaint" component={ViewListComplaint} />
									<Route path="/admin-normal/statistic-revenue" component={StatisticAndRevenue} />
								</Content>
							</Layout>
						</Layout>
					</Layout>
				</Route>
			</BrowserRouter>
		);
	}
}

export default App;
