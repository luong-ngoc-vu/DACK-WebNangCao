import React from 'react';
import './NavBar.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Input, Dropdown, Avatar } from 'antd';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import 'ant-design-pro/dist/ant-design-pro.css';
const { Sider, Header } = Layout;
const { Search } = Input;

class NavBar extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link>Thông tin tài khoản</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/logout">Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="header">
        <div>
          <HeaderSearch
            placeholder="Nhập từ khóa tìm kiếm"
            dataSource={['1', '2', '3']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
        </div>
        <div style={{ margin: '0 30px' }}>
          <NoticeIcon count={5}></NoticeIcon>
        </div>
        <div>
          <Dropdown overlay={menu} style={{ marginLeft: '20px' }}>
            <a className="ant-dropdown-link" href="#">
              <Avatar src="https://2game.vn/imgstore/pictures/2game/2019/10/09/2game-natra-ma-dong-h5-logo-1.png" />{' '}
              Bùi Vũ
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
export default NavBar;
