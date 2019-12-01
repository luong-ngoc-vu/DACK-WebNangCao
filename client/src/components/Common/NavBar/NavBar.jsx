import React from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './NavBar.css';
import { Menu, Icon, Layout, Row, Col } from 'antd';
const { Header } = Layout;
const { SubMenu } = Menu;

class NavBar extends React.Component {
  state = {
    current: 'home'
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header style={{ height: '60px' }}>
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
              <div className="logo"></div>
              <Menu
                className="NavBar"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="home">
                  <Link to="/home">
                    <Icon type="home" />
                    Trang chủ
                  </Link>
                </Menu.Item>

                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="setting" />
                      Profile để test
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Profile">
                    <Menu.Item key="setting:1">
                      <Link to="/student-profile">Profile học viên</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                      <Link to="/tutor-profile">Profile gia sư</Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>

                <Menu.Item key="login">
                  <Link to="/login">
                    {' '}
                    <Icon type="login" />
                    Đăng nhập
                  </Link>
                </Menu.Item>
                <Menu.Item key="register">
                  <Link to="/register">
                    <Icon type="user-add" />
                    Đăng ký
                  </Link>
                </Menu.Item>
                <Menu.Item key="alipay">
                  <a
                    href="https://ant.design"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đăng tin gia sư
                  </a>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={3}></Col>
          </Row>
        </Header>
        <Row className="sub-nav">
          <Col span={3}></Col>
          <Col span={18}>
            <Menu
              mode="horizontal"
              style={{ height: '100%', border: '0', lineHeight: '43px' }}
            >
              <Menu.Item key="1">Toán thi đại học</Menu.Item>
              <Menu.Item key="2">Lý thi đại học</Menu.Item>
              <Menu.Item key="3">Hóa thi đại học</Menu.Item>
              <Menu.Item key="4">Tiếng anh giao tiếp</Menu.Item>
              <Menu.Item key="5">Tiếng nhật cơ bản</Menu.Item>
              <Menu.Item key="6">Tiếng hàn cơ bản</Menu.Item>
              <Menu.Item key="7">Toán cấp 1</Menu.Item>
              <Menu.Item key="8">Toán thi THPT</Menu.Item>
              <Menu.Item key="9">Toán thi HSG</Menu.Item>
              <Menu.Item key="10">Văn thi THPT</Menu.Item>
              <Menu.Item key="11">Văn cấp 2</Menu.Item>
              <Menu.Item key="12">Hóa cấp 3</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NavBar;
