import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { Redirect } from 'react-router-dom';
import { Input, Select, Table, Typography } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

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

class StatisticAndRevenue extends Component {
	state = {
		filteredInfo: null,
		sortedInfo: null,
		allContracts: [],
		dataAllTutorRevenueMonth: [],
		dataAllTutorRevenueQuater: [],
		dataAllTutorRevenueYear: [],
		contractsByStatus: [],
		filterBy: 'bymonth',
		year: 2019
	};

	filterChange = (value) => {
		this.setState({ filterBy: value });
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
		fetch(`http://localhost:4000/contract/thongKeDoanhThuAllTutorByMonth/${2019}`)
			.then((response) => response.json())
			.then((data) => this.setState({ dataAllTutorRevenueMonth: data }))
			.catch((error) => {
				return error;
			});
		fetch(`http://localhost:4000/contract/thongKeDoanhThuAllTutorByQuarter/${this.state.year}`)
			.then((response) => response.json())
			.then((data) => this.setState({ dataAllTutorRevenueQuater: data }))
			.catch((error) => {
				return error;
			});
		fetch(`http://localhost:4000/contract/thongKeDoanhThuAllTutorByYear`)
			.then((response) => response.json())
			.then((data) => this.setState({ dataAllTutorRevenueYear: data }))
			.catch((error) => {
				return error;
			});
		fetch(`http://localhost:4000/contract/contractByStatus/${2}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ contractsByStatus: data });
			})
			.catch((error) => {
				return error;
			});
	}

	render() {
		const {
			contractsByStatus,
			dataAllTutorRevenueMonth,
			dataAllTutorRevenueQuater,
			dataAllTutorRevenueYear,
			filterBy
		} = this.state;
		const { isLogin } = this.props;
		const dataContracts = contractsByStatus.map((item) => ({
			idContract: item.idContract,
			tutorName: item.nameTeacher,
			hirerName: item.nameStudent,
			dateContract: moment(item.dateContract).format('DD/MM/YYYY'),
			dateContractEnd: moment(item.dateContractEnd).format('DD/MM/YYYY'),
			totalMoneyContract: item.totalMoneyContract.toLocaleString('vi', { style: 'currency', currency: 'VND' }),
			cost: item.totalMoneyContract
		}));

		if (isLogin === false) {
			return <Redirect to="/admin-login" />;
		}

		let result = []; // show data after recfactor;
		if (filterBy === 'bymonth') {
			let uni = this.groupBy(dataAllTutorRevenueMonth, 'month'); //Group by month

			for (let i in uni) {
				const rev = uni[i].map((item) => item.revenue).reduce((acc, cur) => acc + cur);
				result.push({ x: `Tháng ${i}`, y: rev });
			}
		} else if (filterBy === 'byquater') {
			dataAllTutorRevenueQuater.map((item) => {
				item.map((i) => result.push({ x: `Quý ${i._id}`, y: i.revenue }));
			});
		} else if (filterBy === 'byyear') {
			dataAllTutorRevenueYear.map((item) => result.push({ x: `Năm ${item._id.year}`, y: item.revenue }));
		}
		return (
			<div style={{ padding: '10px 20px' }}>
				<div style={{ float: 'right' }}>
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
				<Bar height={300} title="Thống kê doanh thu của gia sư" data={result} />
				<div style={{ width: 'auto', marginTop: 30 }}>
					<Text strong style={{ fontSize: 18 }}>
						Danh sách hợp đồng đã hoàn thành
					</Text>
					<div style={{ float: 'right' }} />
				</div>
				<Table columns={columns} dataSource={dataContracts} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.LoginReducer.isLogin,
	nameTeacher: state.LoginReducer.name,
	idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(StatisticAndRevenue);
