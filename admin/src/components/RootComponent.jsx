import React from 'react'
import {Breadcrumb, Layout} from 'antd';
import 'antd/dist/antd.css'
import '../App.css'

import {BrowserRouter, Route} from 'react-router-dom';
import SideBar from '../components/Menu/SideBar/SideBar';
import NavBar from '../components/Menu/NavBar/NavBar';
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
                        </Layout>
                    </Layout>
                </Route>

            </BrowserRouter>
        );
    }
}

export default App;
