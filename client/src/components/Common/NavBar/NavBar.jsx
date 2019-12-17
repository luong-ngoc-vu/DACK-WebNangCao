import React from 'react';
import {Link} from 'react-router-dom';

import 'antd/dist/antd.css';
import './NavBar.css';
import {Avatar, Col, Icon, Layout, Menu, Row} from 'antd';

const {Header} = Layout;
const {SubMenu} = Menu;

class NavBar extends React.Component {
    state = {
        current: 'home',
        skills: []
    };

    handleClick = e => {
        this.setState({current: e.key});
    };

    componentDidMount() {
        fetch('http://localhost:4000/user/getSkills')
            .then(response => response.json())
            .then(data => this.setState({skills: data}));
    }


    render() {
        const st = this.props;
        const {skills} = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Header style={{height: '60px'}}>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={18}>
                            <Avatar
                                style={{width: 40, height: 40}}
                                className="logo"
                                src="https://c7.uihere.com/files/31/651/661/computer-icons-education-scholarship-academic-degree-graduation-ceremony-diploma.jpg"
                            />
                            <Menu
                                className="NavBar"
                                onClick={this.handleClick}
                                selectedKeys={[this.state.current]}
                                mode="horizontal"
                            >
                                <Menu.Item key="home">
                                    <Link to="/home">
                                        <Icon type="home"/>
                                        Trang chủ
                                    </Link>
                                </Menu.Item>

                                {st.isLogin === true && (
                                    <SubMenu
                                        title={
                                            <span className="submenu-title-wrapper">
                        <Icon type="setting"/>
                        Cài đặt
                      </span>
                                        }
                                    >
                                        <Menu.ItemGroup title="Thông tin cá nhân">
                                            {st.typeUser === 1 && (
                                                <Menu.Item key="setting:1">
                                                    <Link to="/hirer-manage/profile">
                                                        <Icon type="user"/>
                                                        Thông tin học viên
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            {st.typeUser === 2 && (
                                                <Menu.Item key="setting:2">
                                                    <Link to="/tutor-manage/profile">
                                                        <Icon type="user"/>
                                                        Thông tin giáo viên
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            <Menu.Item key="setting:1">
                                                <Link
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        st.logOut();
                                                    }}
                                                    to="/login"
                                                >
                                                    <Icon type="logout"/>
                                                    Đăng xuất
                                                </Link>
                                            </Menu.Item>
                                        </Menu.ItemGroup>
                                    </SubMenu>
                                )}
                                {st.isLogin === false && (
                                    <Menu.Item key="login">
                                        <Link to="/login">
                                            {' '}
                                            <Icon type="login"/>
                                            Đăng nhập
                                        </Link>
                                    </Menu.Item>
                                )}
                                {st.isLogin === false && (
                                    <Menu.Item key="register">
                                        <Link to="/register">
                                            <Icon type="user-add"/>
                                            Đăng ký
                                        </Link>
                                    </Menu.Item>
                                )}
                                {st.isLogin === true && (
                                    <Menu.Item>
                                        <Avatar
                                            style={{backgroundColor: '#87d068'}}
                                            src={st.image}
                                        />
                                        &nbsp;&nbsp;&nbsp;
                                        {st.name}
                                    </Menu.Item>
                                )}
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
                            style={{height: '100%', border: '0', lineHeight: '43px'}}
                        >
                            {skills.map(item => (
                                <Menu.Item key={item.name}>
                                    <Link onClick={event => {
                                        st.viewByList(item.name);
                                    }}
                                          to="/listTutorialsBySkill"
                                    >
                                        {item.name}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NavBar;
