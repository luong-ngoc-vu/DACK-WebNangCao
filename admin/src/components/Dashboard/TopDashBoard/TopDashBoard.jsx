import React, { Component } from 'react';
import '../DashBoard.css';
import 'antd/dist/antd.css';
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';

import { Redirect } from 'react-router-dom';
import { Col, Icon, Row, Tooltip } from 'antd';
import Trend from 'ant-design-pro/lib/Trend';
import numeral from 'numeral';
import moment from 'moment';
import { connect } from 'react-redux';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
	visitData.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
		y: Math.floor(Math.random() * 100) + 10
	});
}
const columns = [
	{
		title: 'Mã hợp đồng',
		dataIndex: 'idContract',
		key: 'idContract'
	},
	{
		title: 'Tên gia sư',
		dataIndex: 'tutorName',
		key: 'tutorName'
	},
	{
		title: 'Tên người thuê',
		dataIndex: 'hirerName',
		key: 'hirerName'
	},
	{
		title: 'Ngày bắt đầu',
		dataIndex: 'dateContract',
		key: 'dateContract'
	},
	{
		title: 'Ngày kết thúc',
		dataIndex: 'dateContractEnd',
		key: 'dateContractEnd'
	},
	{
		title: 'Khoản thanh toán',
		dataIndex: 'totalMoneyContract',
		key: 'totalMoneyContract'
	}
];

class TopDashBoard extends Component {
	state = {
		filteredInfo: null,
		sortedInfo: null,
		allContracts: [],
		topThreeTutorialHighestRevenue: [],
		revenueAllTutorCurrentYear: [],
		allNumberForDashboard: [],
		contractsByStatus: [],
		dataAllTutorRevenueMonth: []
	};
	groupBy = (objectArray, property) => {
		return objectArray.reduce(function(acc, obj) {
			let key = obj[property];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	};
	componentDidMount() {
		const { idTeacher } = this.props;

		fetch(`http://localhost:4000/contract/thongKeDoanhThuAllTutorByMonth/${2019}`)
			.then((response) => response.json())
			.then((data) => this.setState({ dataAllTutorRevenueMonth: data }))
			.catch((error) => {
				return error;
			});
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
		fetch(`http://localhost:4000/contract/thongKeDoanhThuAllTutorByYear`)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					revenueAllTutorCurrentYear: data
				})
			)
			.catch((error) => {
				return error;
			});
		fetch(`http://localhost:4000/contract/getAllNumberForDashboard`)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					allNumberForDashboard: data
				})
			)
			.catch((error) => {
				return error;
			});
	}

	render() {
		const { dataAllTutorRevenueMonth } = this.state;
		const result = [];
		let uni = this.groupBy(dataAllTutorRevenueMonth, 'month'); //Group by month

		for (let i in uni) {
			const rev = uni[i].map((item) => item.revenue).reduce((acc, cur) => acc + cur);
			result.push({ x: `Tháng ${i}`, y: rev });
		}

		const { allContracts, revenueAllTutorCurrentYear, allNumberForDashboard } = this.state;
		let totalRevenueTutorByYear = 0;
		let listData = [];

		revenueAllTutorCurrentYear.map((item) => {
			totalRevenueTutorByYear = item.revenue;
		});

		allNumberForDashboard.map((item) => {
			item.map((sub) => {
				listData.push(sub.count);
			});
		});

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

		const revenueData = [];
		if (isLogin === false) {
			return <Redirect to="/admin-login" />;
		}

		for (let i = 0; i < 12; i += 1) {
			revenueData.push({
				x: `Tháng ${i + 1}`,
				y: Math.floor(Math.random() * 1000) + 200
			});
		}
		return (
			<div style={{ padding: '10px 5px' }}>
				<Row>
					<Col span={6} className="card-show-data">
						<ChartCard
							title="Doanh thu trong 2019"
							action={
								<Tooltip title="Doanh thu trong năm 2019">
									<Icon type="info-circle-o" />
								</Tooltip>
							}
							total={() => (
								<span
									dangerouslySetInnerHTML={{ __html: numeral(totalRevenueTutorByYear).format('0,0') }}
								/>
							)}
							footer={<Field label="Doanh thu tháng (12)" value={numeral(listData[0]).format('0,0')} />}
							contentHeight={60}
						>
							<MiniArea line height={45} data={result} />
						</ChartCard>
					</Col>
					<Col span={6} className="card-show-data">
						<ChartCard
							title="Hợp đồng năm 2019"
							action={
								<Tooltip title="Tổng số hợp đồng đã hoàn thành trong năm 2019">
									<Icon type="info-circle-o" />
								</Tooltip>
							}
							total={numeral(listData[1]).format('0,0')}
							footer={<Field label="Hợp đồng tháng (12)" value={numeral(listData[2]).format('0,0')} />}
							contentHeight={60}
						>
							<MiniBar height={60} data={result} />
						</ChartCard>
					</Col>
					<Col span={6} className="card-show-data">
						<ChartCard
							title="Số lượng người truy cập"
							total={numeral(8860).format('0,0')}
							contentHeight={60}
							footer={<Field label="Truy cập hôm nay" value={numeral(1234).format('0,0')} />}
						>
							<MiniArea line height={45} data={visitData} />
						</ChartCard>
					</Col>

					<Col span={6} className="card-show-data">
						<ChartCard
							title=""
							action={
								<Tooltip title="">
									<Icon type="info-circle-o" />
								</Tooltip>
							}
							total="78%"
							footer={
								<div>
									<span>
										abcd
										<Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
											12%
										</Trend>
									</span>
									<span style={{ marginLeft: 16 }}>
										<Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
											11%
										</Trend>
									</span>
								</div>
							}
							contentHeight={60}
						>
							<MiniProgress percent={78} strokeWidth={8} target={80} />
						</ChartCard>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.LoginReducer.isLogin,
	nameTeacher: state.LoginReducer.name,
	idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(TopDashBoard);
