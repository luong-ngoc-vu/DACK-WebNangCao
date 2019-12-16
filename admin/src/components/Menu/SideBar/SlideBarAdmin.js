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
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
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
                            <Link to="/admin-normal/home">Xem danh sách</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="laptop" />
                                Quản lý kỹ năng
              </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to="/admin-normal/createSkill">Thêm mới kỹ năng</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/admin-normal/skills">Danh sách kỹ năng</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="notification" />
                                Quản lý hợp đồng
              </span>
                        }
                    >
                        <Menu.Item key="9">Phê duyệt hợp đồng</Menu.Item>
                        <Menu.Item key="10">Xem danh sách</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Icon type="notification" />
                                Quản lý khiếu nại
              </span>
                        }
                    >
                        <Menu.Item key="9">Phê duyệt khiếu nại</Menu.Item>
                        <Menu.Item key="10">Xem danh sách</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SideBar;
