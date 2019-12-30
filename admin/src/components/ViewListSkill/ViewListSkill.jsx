import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import { Button, Form, Input, Modal, Select, Table, Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import CreateSkillContainer from '../CreateSkill/CreateSkillContainer';
import moment from 'moment';
import ViewDetailSkillContainer from '../ViewDetailSkill/ViewDetailSkillContainer';
const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const columns = [
	{
		title: 'Tên kỹ năng',
		dataIndex: 'skillName'
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createDate'
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
			checkSearchByname: false,
			dataSkill: [],
			dataSkillByName: [],
			visibleAdd: false,
			visibleEdit: false
		};
	}

	showModalEdit = () => {
		this.setState({
			visibleEdit: true
		});
	};
	handleOkEdit = (e) => {
		console.log(e);
		this.setState({
			visibleEdit: false
		});
	};

	handleCancelEdit = (e) => {
		console.log(e);
		this.setState({
			visibleEdit: false
		});
	};

	showModalAdd = () => {
		this.setState({
			visibleAdd: true
		});
	};
	handleOkAdd = (e) => {
		console.log(e);
		this.setState({
			visibleAdd: false
		});
	};

	handleCancelAdd = (e) => {
		console.log(e);
		this.setState({
			visibleAdd: false
		});
	};

	componentDidMount() {
		fetch('https://apiadminthuegiasu.herokuapp.com/admin/skills')
			.then((response) => response.json())
			.then((data) => this.setState({ dataSkill: data }));
	}

	render() {
		const st = this.props;
		if (st.isLogin === false) {
			return <Redirect to="/admin-login" />;
		}

		const { dataSkill, dataSkillByName } = this.state;

		let data_skill = dataSkill;

		if (this.state.checkSearchByname === true) data_skill = dataSkillByName;
		else if (this.state.checkSearchByname === false) data_skill = dataSkill;
		let data = data_skill.map((item) => ({
			skillName: item.name,
			createDate: moment(item.createdDate).format('DD/MM/YYYY'),
			key: item.name,
			action: (
				<span style={{ display: 'flex', flexDirection: 'row' }}>
					<Button
						style={{ marginRight: 10 }}
						onClick={(event) => {
							this.showModalEdit();
							st.viewDetailSkill(item._id);
						}}
						type="primary"
						icon="edit"
					/>

					<Button
						icon="delete"
						size="default"
						onClick={(event) => {
							st.deleteSkill(item._id);
						}}
						type="danger"
					/>
				</span>
			),
			children: item.children.map((children) => ({
				skillName: children,
				createDate: moment(item.createdDate).format('DD/MM/YYYY'),
				key: children,
				action: (
					<span style={{ display: 'flex', flexDirection: 'row' }}>
						<Button
							style={{ marginRight: 10 }}
							onClick={(event) => {
								this.showModalEdit();
								st.viewDetailSkill(item._id);
							}}
							type="primary"
							icon="edit"
						/>

						<Button
							icon="delete"
							size="default"
							onClick={(event) => {
								st.deleteSkill(item._id);
							}}
							type="danger"
						/>
					</span>
				)
			}))
		}));

		return (
			<div>
				<div style={{ width: '100%', padding: '5px 10px' }}>
					<Text style={{ fontSize: '20px' }}>Danh sách kỹ năng</Text>
					<div style={{ float: 'right' }}>
						<Search
							placeholder="Tìm kỹ năng"
							onSearch={(value) => {
								fetch(`https://apiadminthuegiasu.herokuapp.com/admin/getSkillByName/${value}`)
									.then((response) => response.json())
									.then((data) =>
										this.setState({
											dataSkillByName: data,
											checkSearchByname: true
										})
									);
							}}
							enterButton
							style={{ width: 200, marginRight: '10px' }}
						/>

						<Button type="primary" icon="plus" onClick={this.showModalAdd}>
							Thêm kỹ năng
						</Button>
					</div>
				</div>
				<Table columns={columns} dataSource={data} size="default" pagination={{ pageSize: 5 }} />

				<Modal
					style={{ width: 'auto', maxWidth: 450, minWidth: 450, top: 25 }}
					title="Tạo mới kỹ năng"
					visible={this.state.visibleAdd}
					onOk={this.handleOkAdd}
					onCancel={this.handleCancelAdd}
					footer={null}
				>
					<CreateSkillContainer />
				</Modal>
				<Modal
					style={{ width: 'auto', maxWidth: 450, minWidth: 450 }}
					title="Cập nhật kỹ năng"
					visible={this.state.visibleEdit}
					onOk={this.handleOkEdit}
					onCancel={this.handleCancelEdit}
					footer={null}
				>
					<ViewDetailSkillContainer />
				</Modal>
			</div>
		);
	}
}

const ViewListSkill = Form.create({ name: 'profile_form' })(ViewListSkillForm);
export default ViewListSkill;
