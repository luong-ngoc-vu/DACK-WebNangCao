import React from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './NavBar.css';
import { Avatar, Col, Icon, Layout, Menu, Row } from 'antd';
import Dropdown from 'antd/es/dropdown';
import LOGO from '../../../LOGO.png';
const { Header } = Layout;
const { SubMenu } = Menu;

class NavBar extends React.Component {
	state = {
		current: 'home',
		skills: [],
		subSkillBySkillName: [],
		skillNameSelected: '',
		subSkillSelected: ''
	};

	handleClick = (e) => {
		this.setState({ current: e.key });
	};

	componentDidMount() {
		fetch('http://localhost:4000/user/getSkills')
			.then((response) => response.json())
			.then((data) => this.setState({ skills: data }));
	}

	render() {
		const st = this.props;
		const { skills, subSkillBySkillName } = this.state;

		const subMenuSkill = (
			<Menu>
				{subSkillBySkillName.map((item) => (
					<Menu.Item key={item}>
						<Link
							onClick={(event) => {
								this.setState({ subSkillSelected: item });
								st.viewByList(item);
							}}
							to={`/view-more-tutor/${item}`}
						>
							{item}
						</Link>
					</Menu.Item>
				))}
			</Menu>
		);

		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Header style={{ height: '70px' }}>
					<Row>
						<Col span={3} />
						<Col span={18}>
							<Link to="/home">
								<img className="logo" src={LOGO} style={{ objectFit: 'fill' }} />
							</Link>
							<Menu
								className="NavBar"
								onClick={this.handleClick}
								selectedKeys={[ this.state.current ]}
								mode="horizontal"
							>
								<Menu.Item key="home">
									<Link to="/home">
										<Icon type="home" />
										Trang chủ
									</Link>
								</Menu.Item>
								<Menu.Item key="tutors">
									<Link to="/view-more-tutor">
										<Icon type="contacts" />
										Tìm gia sư
									</Link>
								</Menu.Item>

								{st.isLogin === true && (
									<SubMenu
										title={
											<span className="submenu-title-wrapper">
												<Avatar style={{ backgroundColor: '#87d068' }} src={st.image} />
												&nbsp;&nbsp;&nbsp;
												{st.name}
											</span>
										}
									>
										<Menu.ItemGroup title="Thông tin cá nhân">
											{st.typeUser === 1 && (
												<Menu.Item key="setting:1">
													<Link to="/hirer-manage/profile">
														<Icon type="user" />
														Thông tin học viên
													</Link>
												</Menu.Item>
											)}
											{st.typeUser === 2 && (
												<Menu.Item key="setting:2">
													<Link to="/tutor-manage/profile">
														<Icon type="user" />
														Thông tin giáo viên
													</Link>
												</Menu.Item>
											)}
											<Menu.Item key="setting:1">
												<Link
													onClick={(e) => {
														e.preventDefault();
														st.logOut();
													}}
													to="/login"
												>
													<Icon type="logout" />
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
											<Icon type="login" />
											Đăng nhập
										</Link>
									</Menu.Item>
								)}
								{st.isLogin === false && (
									<Menu.Item key="register">
										<Link to="/register">
											<Icon type="user-add" />
											Đăng ký
										</Link>
									</Menu.Item>
								)}
							</Menu>
						</Col>
						<Col span={3} />
					</Row>
				</Header>
				<Row className="sub-nav">
					<Col span={3} />
					<Col
						span={18}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							justifyItems: 'flex-start'
						}}
					>
						{skills.map((item) => (
							<Dropdown overlay={subMenuSkill} trigger={[ 'click' ]} placement="bottomLeft">
								<Link
									style={{ marginRight: '30px' }}
									onClick={(event) => {
										this.setState({ skillNameSelected: item.name });
										fetch(`http://localhost:4000/user/getChildrenBySkillName/${item.name}`)
											.then((response) => response.json())
											.then((data) => this.setState({ subSkillBySkillName: data }));
									}}
								>
									{item.name}
								</Link>
							</Dropdown>
						))}
					</Col>
				</Row>
			</div>
		);
	}
}

export default NavBar;
