import React, { Component } from 'react';
import '../DashBoard.css';
import 'antd/dist/antd.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { Redirect } from 'react-router-dom';
import { Input, Select, Table, Typography, Tabs, Row, Col, List, Avatar } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;

const topTutor = [
	{
		x: 'Lương Ngọc Vũ',
		y: 3000000,
		z: 'teacher10@gmail.com'
	},
	{
		x: 'Lương Ngọc A',
		y: 4000000,
		z: 'teacher9@gmail.com'
	},
	{
		x: 'Lương Ngọc B',
		y: 3000000,
		z: 'teacher7@gmail.com'
	},
	{
		x: 'Lương Ngọc C',
		y: 3000000,
		z: 'teacher6@gmail.com'
	},
	{
		x: 'Lương Ngọc D',
		y: 10000000,
		z: 'teacher1@gmail.com'
	},
	{
		x: 'Lương Ngọc E',
		y: 8000000,
		z: 'teacher1@gmail.com'
	},
	{
		x: 'Lương Ngọc F',
		y: 9000000,
		z: 'teacher1@gmail.com'
	}
];
class MiddleDashBoard extends Component {
	state = {
		filteredInfo: null,
		sortedInfo: null,
		allContracts: [],
		contractsByStatus: []
	};

	componentDidMount() {
		const { idTeacher } = this.props;

		fetch(`http://localhost:4000/contract/getListContractByIdTeacher/${idTeacher}`)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					allContracts: data.filter((item) => item.status === 2)
				})
			)
			.catch((error) => {
				return error;
			});
	}

	render() {
		const { allContracts } = this.state;
		const { isLogin } = this.props;
		const dataContracts = allContracts.map((item) => ({
			idContract: item.idContract,
			tutorName: item.nameTeacher,
			hirerName: item.nameStudent,
			dateContract: moment(item.dateContract).format('DD/MM/YYYY'),
			dateContractEnd: moment(item.dateContractEnd).format('DD/MM/YYYY'),
			totalMoneyContract: item.totalMoneyContract.toLocaleString('vi', { style: 'currency', currency: 'VND' }),
			cost: item.totalMoneyContract
		}));

		return (
			<div style={{ padding: '10px 20px' }}>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Top gia sư theo doanh thu" key="1">
						<Row gutter={20}>
							<Col span={16}>
								<Bar height={400} title="Thống kê doanh thu của gia sư" data={topTutor} />
							</Col>
							<Col span={8}>
								<div style={{ width: '100%' }}>
									<h4>
										<span>Top gia sư</span>
									</h4>
									<ol
										style={{
											listStyleType: 'none',
											margin: 20,
											padding: 0
										}}
									>
										{topTutor.map((item, index) => (
											<li
												style={{
													display: 'flex',
													flexDirection: 'row',
													position: 'relative',
													marginBottom: 10
												}}
											>
												<div className="ranking ${}">
													<Text className={`text-ranking top-${index + 1}`}>{index + 1}</Text>
												</div>
												<Avatar
													style={{ marginRight: 5 }}
													size="large"
													src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
												/>
												<div
													style={{
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'flex-start'
													}}
												>
													<span style={{ color: 'blue' }}>{item.x}</span>
													<span>{item.z}</span>
												</div>
												<span style={{ float: 'right', position: 'absolute', right: 0 }}>
													{item.y} vnđ
												</span>
											</li>
										))}
									</ol>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab="Top chuyên mục theo doanh thu" key="2">
						<Row gutter={20}>
							<Col span={16}>
								<Bar height={400} title="Thống kê doanh thu của gia sư" data={topTutor} />
							</Col>
							<Col span={8}>
								<div style={{ width: '100%' }}>
									<h4>
										<span>Top gia sư</span>
									</h4>
									<ol
										style={{
											listStyleType: 'none',
											margin: 0,
											padding: 0
										}}
									>
										<li style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
											<div className="ranking">
												<Text className="text-ranking">1</Text>
											</div>
											<Avatar
												style={{ marginRight: 5 }}
												size="large"
												src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
											/>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'flex-start'
												}}
											>
												<span style={{ color: 'blue' }}>Lương Ngọc Vũ</span>
												<span>teacher1@gmail.com</span>
											</div>
											<span style={{ float: 'right', position: 'absolute', right: 0 }}>
												15,323,234 vnđ
											</span>
										</li>
									</ol>
								</div>
							</Col>
						</Row>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.LoginReducer.isLogin,
	nameTeacher: state.LoginReducer.name,
	idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(MiddleDashBoard);
