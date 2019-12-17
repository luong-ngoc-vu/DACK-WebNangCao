import React from 'react';
import './SideBar.css';
import 'antd/dist/antd.css';
import { Icon, Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
    render() {
        return (
            <Sider width={220} style={{ background: '#fff' }}>
                <div className="logo">
                    <img
                        sizes="50"
                        alt="alt"
                        className="avatar-admin"
                        src="https://2game.vn/imgstore/pictures/2game/2019/10/09/2game-natra-ma-dong-h5-logo-1.png"
                    ></img>
                    <span className="name-admin">Member Admin</span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}

                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key='1'>
                        <Link to="/admin-normal/dashboard"><Icon type="home" />Trang chủ</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                Quản lý tài khoản
              </span>
                        }
                    >
                        <Menu.Item key="2">
                            <Link to="/admin-normal/view-list-user">Xem danh sách</Link>
                        </Menu.Item>
                    </SubMenu>



                    <Menu.Item key="3">
                        <Link to="/admin-normal/skills"><Icon type="tags" />Danh sách kỹ năng</Link>
                    </Menu.Item>

                    <SubMenu
                        key="4"
                        title={
                            <span>
                                <Icon type="notification" />
                                Quản lý hợp đồng
              </span>
                        }
                    >
                        <Menu.Item key="5"><Link to="/admin-normal/contract"></Link>Phê duyệt hợp đồng</Menu.Item>
                        <Menu.Item key="6">Xem danh sách</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="7"
                        title={
                            <span>
                                <Icon type="notification" />
                                Quản lý khiếu nại
              </span>
                        }
                    >
                        <Menu.Item key="8">Phê duyệt khiếu nại</Menu.Item>
                        <Menu.Item key="19">Xem danh sách</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SideBar;
