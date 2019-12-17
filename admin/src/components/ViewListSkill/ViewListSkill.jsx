import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import { Button, Form, Table, Typography, Divider, Row, Col, Select, Input, Modal } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import CreateSkillContainer from '../CreateSkill/CreateSkillContainer';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const columns = [
	{
		title: 'Tên kỹ năng',
		dataIndex: 'skillName'
	},
	{
		title: 'Thao tác',
		dataIndex: 'action'
	}
];

class ViewListSkillForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSkill: [],
			visible: false
		};
	}
	showModal = () => {
		this.setState({
			visible: true
		});
	};
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	componentDidMount() {
		fetch('https://apiadminwebsitethuegiasu.herokuapp.com/admin/skills')
			.then((response) => response.json())
			.then((data) => this.setState({ dataSkill: data }));
	}

	render() {
		const st = this.props;
		if (st.isLogin === false) {
			return <Redirect to="/admin-login" />;
		}
		const { dataSkill } = this.state;
		const data = dataSkill.map((row) => ({
			skillName: row.name,
			action: (
				<span style={{ display: 'flex', flexDirection: 'row' }}>
					<Link
						style={{ marginRight: 10 }}
						to="/admin-normal/detailSkill"
						size="large"
						onClick={(event) => {
							st.viewDetailSkill(row._id);
						}}
					>
						<Button type="primary" icon="edit" />
					</Link>

					<Link>
						<Button
							icon="delete"
							size="default"
							onClick={(event) => {
								st.deleteSkill(row._id);
							}}
							type="danger"
						/>
					</Link>
				</span>
			)
		}));
		return (
			<div>
				<div style={{ width: '100%', padding: '5px 10px' }}>
					<Text style={{ fontSize: '20px' }}>Danh sách kỹ năng</Text>
					<div style={{ float: 'right' }}>
						<Search
							placeholder="Tìm kỹ năng"
							onSearch={(value) => console.log(value)}
							enterButton
							style={{ width: 200, marginRight: '10px' }}
						/>

						<Button type="primary" icon="plus" onClick={this.showModal}>
							Thêm kỹ năng
						</Button>
					</div>
				</div>
				<Table columns={columns} dataSource={data} size="default" />

				<Modal
					style={{ width: 'auto', maxWidth: 400 }}
					title="Tạo mới kỹ năng"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
				>
					<CreateSkillContainer />
				</Modal>
			</div>
		);
	}
}

const ViewListSkill = Form.create({ name: 'profile_form' })(ViewListSkillForm);
export default ViewListSkill;
