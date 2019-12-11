import React from 'react'
import {Breadcrumb, Layout} from 'antd';
import 'antd/dist/antd.css'
import '../App.css'

import {BrowserRouter, Route} from 'react-router-dom';
import SideBar from '../components/Menu/SideBar/SideBar';
import SlideBarAdmin from '../components/Menu/SideBar/SlideBarAdmin';
import NavBarContainer from '../components/Menu/NavBar/NavBarContainer';
import ViewListAdmin from "./ViewListAdmin/ViewListAdmin";
import ViewListUserContainer from "./ViewListUsers/ViewListUsersContainer";
import ViewDetailUserContainer from './ViewDetailUser/ViewDetailUserContainer';
import CreateAdminContainer from '../components/CreateAdmin/CreateAdminContainer';
import LoginContainer from '../components/LoginAdmin/LoginContainer';

const {Header, Sider, Content} = Layout;

class App extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <Route path="/admin-login" component={LoginContainer}/>
                <Route path="/dashboard">
                    <Layout style={{height: '100vh'}}>
                        <SideBar/>
                        <Layout>
                            <NavBarContainer/>
                            <Layout style={{padding: '0 24px 24px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
                                    <Breadcrumb.Item>Tạo tài khoản member</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}
                                >
                                    <Route path="/dashboard" component={CreateAdminContainer}/>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Route>
                <Route path="/admins">
                    <Layout style={{height: '100vh'}}>
                        <SideBar/>
                        <Layout>
                            <NavBarContainer/>
                            <Layout style={{padding: '0 24px 24px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item>Xem danh sách tài khoản</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}
                                >
                                    <Route path="/admins" component={ViewListAdmin}/>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Route>
                <Route path="/home">
                    <Layout style={{height: '100%'}}>
                        <SlideBarAdmin/>
                        <Layout>
                            <NavBarContainer/>
                            <Layout style={{padding: '0 24px 24px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item>Danh sách thành viên</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}
                                >
                                    <Route path="/home" component={ViewListUserContainer}/>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Route>
                <Route path="/detailUser">
                    <Layout style={{height: '100%'}}>
                        <SlideBarAdmin/>
                        <Layout>
                            <NavBarContainer/>
                            <Layout style={{padding: '0 24px 24px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}
                                >
                                    <Route path="/detailUser" component={ViewDetailUserContainer}/>
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
