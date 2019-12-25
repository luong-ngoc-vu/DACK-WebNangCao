import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { Redirect } from 'react-router-dom';
import { Input, Select, Table, Typography } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

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

class ManageRevenue extends Component {
	state = {
		filteredInfo: null,
		sortedInfo: null,
		allContracts: [],
		dataRevenueMonth: [],
		dataRevenueQuater: [],
		dataRevenueYear: [],
		contractsByStatus: [],
		filterBy: ''
	};

	filterChange = (value) => {
		this.setState({ filterBy: value });
	};
	groupBy = (objectArray, property) => {
		return objectArray.reduce(function(acc, obj) {
			var key = obj[property];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
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

		fetch(`http://localhost:4000/contract/thongKeDoanhThuByMonth/${idTeacher}/${2019}`)
			.then((response) => response.json())
			.then((data) => this.setState({ dataRevenueMonth: data }))
			.catch((error) => {
				return error;
			});
		fetch(`http://localhost:4000/contract/thongKeDoanhThuByQuater/${idTeacher}/${2019}`)
			.then((response) => response.json())
			.then((data) => this.setState({ dataRevenueQuater: data }))
			.catch((error) => {
				return error;
			});
	}

	render() {
		const { allContracts, dataRevenueMonth, filterBy } = this.state;
		const { isLogin } = this.props;
		const dataContracts = allContracts.map((item) => ({
			idContract: item.idContract,
			tutorName: item.nameTeacher,
			hirerName: item.nameStudent,
			dateContract: moment(item.dateContract).format('DD/MM/YYYY'),
			dateContractEnd: moment(item.dateContractEnd).format('DD/MM/YYYY'),
			totalMoneyContract: numeral(item.totalMoneyContract).format('0,0'),
			cost: item.totalMoneyContract
		}));

		const revenueData = [];
		if (isLogin === false) {
			return <Redirect to="/admin-login" />;
		}

		var uni = this.groupBy(dataRevenueMonth, 'month'); //Group by month
		var result = []; // show data after recfactor;

		for (var i in uni) {
			const rev = uni[i].map((item) => item.revenue).reduce((acc, cur) => acc + cur);
			result.push({ x: `Tháng ${i}`, y: rev });
		}

		console.log('data cần test +', filterBy);
		return (
			<div style={{ padding: '10px 20px' }}>
				<div style={{ float: 'right' }}>
					<Select defaultValue="bymonth" style={{ width: 'auto' }} onChange={this.filterChange}>
						<Option value="byweek">Doanh thu theo tuần</Option>
						<Option value="bymonth">Doanh thu theo tháng</Option>
						<Option value="byquater">Doanh thu theo quý</Option>
						<Option value="byyear">Doanh thu theo năm</Option>
					</Select>
				</div>
				<Bar height={400} title="Thống kê doanh thu của gia sư" data={result} />
				<div style={{ width: 'auto', marginTop: 30 }}>
					<Text strong style={{ fontSize: 18 }}>
						Danh sách hợp đồng
					</Text>
				</div>
				<Table columns={columns} dataSource={dataContracts} pagination={{ pageSize: 5 }} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.LoginReducer.isLogin,
	nameTeacher: state.LoginReducer.name,
	idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(ManageRevenue);
