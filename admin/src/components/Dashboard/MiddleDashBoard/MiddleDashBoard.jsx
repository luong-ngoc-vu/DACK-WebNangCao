import React, { Component } from 'react';
import '../DashBoard.css';
import 'antd/dist/antd.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { Redirect } from 'react-router-dom';
import { Avatar, Col, Input, Row, Select, Tabs, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;

const quater = [
	{ key: '1', label: 'Qúy 1' },
	{ key: '2', label: 'Quý 2' },
	{ key: '3', label: 'Quý 3' },
	{ key: '4', label: 'Quý 4' }
];
const month = [
	{
		key: '01',
		label: 'Tháng 1'
	},
	{
		key: '02',
		label: 'Tháng 2'
	},
	{
		key: '03',
		label: 'Tháng 3'
	},
	{
		key: '04',
		label: 'Tháng 4'
	},
	{
		key: '05',
		label: 'Tháng 5'
	},
	{
		key: '06',
		label: 'Tháng 6'
	},
	{
		key: '07',
		label: 'Tháng 7'
	},
	{
		key: '08',
		label: 'Tháng 8'
	},
	{
		key: '09',
		label: 'Tháng 9'
	},
	{
		key: '10',
		label: 'Tháng 10'
	},
	{
		key: '11',
		label: 'Tháng 11'
	},
	{
		key: '12',
		label: 'Tháng 12'
	}
];
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
		contractsByStatus: [],
		topThreeTutorialHighestRevenue: [],
		databyquater: [],
		filterBy: 'byall',
		month: '',
		quater: '',
		year: 2019
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

		fetch(`http://localhost:4000/contract/getListTutorAndRevenue`)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					topThreeTutorialHighestRevenue: data
				})
			)
			.catch((error) => {
				return error;
			});
	}

	render() {
		const { allContracts, topThreeTutorialHighestRevenue, filterBy, databyquater } = this.state;

		const topTutorFromDB = topThreeTutorialHighestRevenue.map((item) => ({
			x: item._id.nameTeacher,
			y: item.revenue,
			imageTeacher: item._id.imageTeacher
		}));

		const { isLogin } = this.props;
		if (isLogin === false) {
			return <Redirect to="/admin-login" />;
		}
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
						<div style={{ width: '100%', margin: 10 }}>
							<span>Chọn tiêu chí xem &ensp;</span>
							<Select
								placeholder="Chọn thời gian"
								style={{ width: 200 }}
								onChange={(value) => {
									this.setState({ filterBy: value });
									console.log(value);
								}}
							>
								<Option value="byall">Tất cả</Option>
								<Option value="byweek">Doanh thu theo tuần</Option>
								<Option value="bymonth">Doanh thu theo tháng</Option>
								<Option value="byquater">Doanh thu theo quý</Option>
							</Select>
							{filterBy === 'bymonth' ? (
								<Select
									placeholder="Chọn tháng"
									style={{ width: 150, marginLeft: 10 }}
									onChange={(value) => this.setState({ month: value })}
								>
									{month.map((item) => <Option value={item.key}>{item.label}</Option>)}
								</Select>
							) : null}
							{filterBy === 'byquater' ? (
								<Select
									placeholder="Chọn quý"
									style={{ width: 150, marginLeft: 10 }}
									onChange={(value) => this.setState({ quater: value })}
								>
									{quater.map((item) => <Option value={item.key}>{item.label}</Option>)}
								</Select>
							) : null}

							<Select
								defaultValue={2019}
								style={{ width: 'auto', marginLeft: 10 }}
								onChange={(value) => this.setState({ year: value })}
							>
								<Option value={2019}>2019</Option>
								<Option value={2020}>2020</Option>
							</Select>
							<Button
								style={{ marginLeft: 10 }}
								type="primary"
								onClick={(event) => {
									const filter =
										filterBy === 'bymonth'
											? this.state.month
											: filterBy === 'byquater' ? this.state.quater : null;

									if (filterBy === 'bymonth')
										fetch(
											`http://localhost:4000/contract/getListTutorAndRevenueByMonth/${this.state
												.year}/${filter}`
										)
											.then((response) => response.json())
											.then((data) =>
												this.setState({
													topThreeTutorialHighestRevenue: data
												})
											)
											.catch((error) => {
												return error;
											});
									else if (filterBy === 'byquater') {
										fetch(
											`http://localhost:4000/contract/getListTutorAndRevenueQuarter/${this.state
												.year}/${filter}`
										)
											.then((response) => response.json())
											.then((data) =>
												this.setState({
													topThreeTutorialHighestRevenue: data
												})
											)
											.catch((error) => {
												return error;
											});
									} else if (filterBy === 'byweek') {
										fetch(`http://localhost:4000/contract/getListTutorAndRevenuCurrentWeek`)
											.then((response) => response.json())
											.then((data) =>
												this.setState({
													topThreeTutorialHighestRevenue: data
												})
											)
											.catch((error) => {
												return error;
											});
									} else {
										fetch(
											`http://localhost:4000/contract/getListTutorAndRevenueByMonth/${this.state
												.year}/${filter}`
										)
											.then((response) => response.json())
											.then((data) =>
												this.setState({
													topThreeTutorialHighestRevenue: data
												})
											)
											.catch((error) => {
												return error;
											});
									}
								}}
							>
								Xem top gia sư
							</Button>
						</div>
						<Row gutter={20}>
							<Col span={16}>
								<Bar height={400} title="Thống kê doanh thu của gia sư" data={topTutorFromDB} />
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
										{topTutorFromDB.map((item, index) => (
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
													src={item.imageTeacher}
												/>
												<div
													style={{
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'flex-start'
													}}
												>
													<span style={{ color: 'blue' }}>{item.x}</span>
												</div>
												<span style={{ float: 'right', position: 'absolute', right: 0 }}>
													{item.y.toLocaleString('vi', {
														style: 'currency',
														currency: 'VND'
													})}
												</span>
											</li>
										))}
									</ol>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab="Top chuyên mục theo doanh thu" key="2">
						<div style={{ width: '100%' }}>
							<Select
								defaultValue="bymonth"
								style={{ width: 'auto' }}
								onChange={(value) => {
									this.setState({ filterBy: value });
									console.log(value);
								}}
							>
								<Option value="bymonth">Doanh thu theo tháng</Option>
								<Option value="byquater">Doanh thu theo quý</Option>
								<Option value="byyear">Doanh thu theo năm</Option>
							</Select>
							<Select
								defaultValue={2019}
								style={{ width: 'auto', marginLeft: 10 }}
								onChange={(value) => this.setState({ year: value })}
							>
								<Option value={2019}>2019</Option>
								<Option value={2020}>2020</Option>
							</Select>
						</div>
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
