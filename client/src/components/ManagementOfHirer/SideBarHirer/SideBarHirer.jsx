import React from 'react';
import './SideBarHirer.css';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Icon, Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBarHirer extends React.Component {
	render() {
		return (
			<div>
				<Sider width={250} style={{ background: '#fff' }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={[ '1' ]}
						defaultOpenKeys={[ 'sub1' ]}
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
								<Link to="/hirer-manage/profile">Sửa thông tin cá nhân</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/hirer-manage/change-password">Thay đổi mật khẩu</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="3" className="item-sider">
							<Link to="/hirer-manage/manage-contract">
								{' '}
								<Icon type="solution" />Quản lý thuê gia sư
							</Link>
						</Menu.Item>
						<Menu.Item key="4" className="item-sider">
							<Icon type="heart" />
							Gia sư đã thích
						</Menu.Item>
						<Menu.Item key="5" className="item-sider">
							<Icon type="message" />
							Tin nhắn
						</Menu.Item>
						<Menu.Item key="6" className="item-sider">
							<Icon type="bell" />
							Thông báo
						</Menu.Item>
						<Menu.Item key="7" className="item-sider">
							<Icon type="dollar" />
							Quản lý Point
						</Menu.Item>
					</Menu>
				</Sider>
			</div>
		);
	}
}

export default SideBarHirer;
