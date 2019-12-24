import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import 'antd/dist/antd.css';
import { Icon, Layout, Menu } from 'antd';

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
            src="https://cdn4.iconfinder.com/data/icons/business-color-4/512/businessman-512.png"
          ></img>
          <span className="name-admin">Root Admin</span>
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
            <Menu.Item key="1">
              <Link to="/admin-root/dashboard">Thêm tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin-root/admins">Xem danh sách</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
