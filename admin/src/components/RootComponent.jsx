import React from 'react'
import {Breadcrumb, Layout} from 'antd';
import 'antd/dist/antd.css'
import '../App.css'

import {BrowserRouter, Route} from 'react-router-dom';
import SideBar from '../components/Menu/SideBar/SideBar';
import NavBar from '../components/Menu/NavBar/NavBar';
<<<<<<< HEAD
import CreateAdminContainer from '../components/CreateAdmin/CreateAdminContainer';
=======
import CreateAdmin from '../components/CreateAdmin/CreateAdmin';
>>>>>>> 7f657e8cff3a9535ac3df94803dc082944446bfb
import LoginContainer from '../components/LoginAdmin/LoginContainer';

const {Header, Sider, Content} = Layout;

class App extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <Route path="/admin-login" component={LoginContainer}/>
<<<<<<< HEAD
                <Route path="/dashboard">
                    <Layout style={{height: '100vh'}}>
                        <SideBar/>
                        <Layout>
                            <NavBar/>
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
=======
                <Route path="/dashboard"><Layout style={{height: '100vh'}}>
                    <SideBar/>
                    <Layout>
                        <NavBar/>
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
                                <Route path="/dashboard/" component={CreateAdmin}/>
                            </Content>
>>>>>>> 7f657e8cff3a9535ac3df94803dc082944446bfb
                        </Layout>
                    </Layout>
                </Route>

            </BrowserRouter>
        );
    }
}

export default App;
