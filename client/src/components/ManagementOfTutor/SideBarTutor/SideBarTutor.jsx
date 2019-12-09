import React from 'react';
import './SideBarTutor.css';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Icon, Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBarTutor extends React.Component {
  render() {
    return (
      <div>
        <Sider width={250} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            className="sider-bar"
          >
            <SubMenu
              className="item-sider"
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  Thông tin cá nhân
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/tutor-manage/profile">Sửa thông tin cá nhân</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/tutor-manage/change-password">
                  Thay đổi mật khẩu
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              className="item-sider"
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  Quản lý yêu cầu
                </span>
              }
            >
              <Menu.Item key="5">Yêu cầu đang chờ</Menu.Item>
              <Menu.Item key="6">Khách hàng đang thuê</Menu.Item>
              <Menu.Item key="7">Khách hàng đã thuê</Menu.Item>
            </SubMenu>

            <Menu.Item key="9" className="item-sider">
              <Icon type="message" />
              Tin nhắn
            </Menu.Item>
            <Menu.Item key="10" className="item-sider">
              <Icon type="bell" />
              Thông báo
            </Menu.Item>
            <Menu.Item key="11" className="item-sider">
              <Icon type="dollar" />
              Quản lý Point
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default SideBarTutor;
