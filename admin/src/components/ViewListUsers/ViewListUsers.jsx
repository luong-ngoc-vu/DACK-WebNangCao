import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import { Link, Redirect } from 'react-router-dom';
import { Form, Table, Typography, Button, Divider, Row, Col, Input, Select } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const columns = [
	{
		title: 'Email',
		dataIndex: 'email'
	},
	{
		title: 'Họ và tên',
		dataIndex: 'name'
	},
	{
		title: 'Số điện thoại',
		dataIndex: 'phone'
	},
	{
		title: 'Thành phố',
		dataIndex: 'addressCity'
	},
	{
		title: 'Loại người dùng',
		dataIndex: 'typeUser'
	},
	{
		title: 'Thao tác',
		dataIndex: 'action'
	}
];

class ViewListUserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataUser: []
		};
	}

	componentDidMount() {
		fetch('https://apiadminwebsitethuegiasu.herokuapp.com/admin/users')
			.then((response) => response.json())
			.then((data) => this.setState({ dataUser: data }));
	}

	render() {
		const st = this.props;
		if (st.isLogin === false) {
			return <Redirect to="/admin-login" />;
		}
		const { dataUser } = this.state;
		const data = dataUser.map((row) => ({
			email: row.email,
			name: row.name,
			phone: row.phone,
			addressCity: row.addressCity,
			typeUser: row.typeUser === 1 ? 'Người thuê' : 'Gia sư',
			action: (
				<span style={{ display: 'flex', flexDirection: 'row' }}>
					<Link
						to="/admin-normal/detailUser"
						size="large"
						onClick={(event) => {
							st.viewDetailUser(row._id);
						}}
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						<Button type="primary" icon="eye" />
					</Link>

					<Link
						to="/admin-normal/detailUser"
						size="large"
						onClick={(event) => {
							st.viewDetailUser(row._id);
						}}
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						<Button type="danger" icon="stop" />
					</Link>
				</span>
			)
		}));
		return (
			<div>
				<div style={{ width: '100%', padding: '5px 10px' }}>
					<Text style={{ fontSize: '20px' }}>Danh sách người dùng</Text>
					<div style={{ float: 'right', display: 'flex', flexDirection: 'row' }}>
						<Select
							defaultValue="all"
							showSearch
							style={{ width: 200 }}
							placeholder="Select a person"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							<Option value="all">Loại user - Tất cả</Option>
							<Option value="hirer">Loại user - Người thuê</Option>
							<Option value="tutor">Loại user - Gia sư</Option>
						</Select>
						<Search
							enterButton
							placeholder="Tìm người dùng"
							onSearch={(value) => console.log(value)}
							style={{ width: 200, margin: '0px 10px' }}
						/>
					</div>
				</div>
				<Table columns={columns} dataSource={data} size="default" />
			</div>
		);
	}
}

const ViewListUser = Form.create({ name: 'profile_form' })(ViewListUserForm);
export default ViewListUser;
