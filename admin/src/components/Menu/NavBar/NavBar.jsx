import React from 'react';
import './NavBar.css';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import {Avatar, Dropdown, Icon, Layout, Menu} from 'antd';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import 'ant-design-pro/dist/ant-design-pro.css';

const {Header} = Layout;

class NavBar extends React.Component {
    render() {
        const st = this.props;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link
                        onClick={e => {
                            e.preventDefault();
                            st.logOut();
                        }}
                        to="/admin-login"
                    >
                        <Icon type="logout"/>
                        &nbsp;&nbsp;Đăng xuất
                    </Link>
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
                <div style={{margin: '0 30px'}}>
                    <NoticeIcon count={5}></NoticeIcon>
                </div>
                <div>
                    <Dropdown overlay={menu} style={{marginLeft: '20px'}}>
                        <a className="ant-dropdown-link" href="/">
                            <Avatar
                                src="https://2game.vn/imgstore/pictures/2game/2019/10/09/2game-natra-ma-dong-h5-logo-1.png"/>{' '}
                            &nbsp;&nbsp;{st.email}
                        </a>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}

export default NavBar;
