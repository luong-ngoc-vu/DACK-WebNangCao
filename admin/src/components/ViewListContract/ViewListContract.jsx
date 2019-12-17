import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Link, Redirect } from 'react-router-dom';
import { Form, Table, Typography, Button, Divider, Row, Col, Input, Select, Tag } from 'antd';
const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const columns = [
	{
		title: 'Mã số',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Tên gia sư',
		dataIndex: 'tutor',
		key: 'tutor'
	},
	{
		title: 'Tên người thuê',
		dataIndex: 'hirer',
		key: 'hirer'
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'date',
		key: 'date'
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: 'status'
	},
	{
		title: 'Khoản thanh toán',
		dataIndex: 'cost',
		key: 'cost'
	},
	{
		title: 'Thao tác',
		dataIndex: 'action',
		key: 'action'
	}
];
const data = [
	{
		id: '1L12',
		tutor: 'Bùi Tuấn Vũ',
		hirer: 'Lương Ngọc Vũ',
		date: '23/12/2019',
		status: 0,
		cost: '15,000'
	},
	{
		id: '2352',
		tutor: 'Bùi Tuấn Vũ',
		hirer: 'Lương Ngọc Vũ',
		date: '23/12/2019',
		status: 2,
		cost: '15,000'
	},
	{
		id: '3954',
		tutor: 'Bùi Tuấn Vũ',
		hirer: 'Lương Ngọc Vũ',
		date: '23/12/2019',
		status: 1,
		cost: '15,000'
	},
	{
		id: '4841',
		tutor: 'Bùi Tuấn Vũ',
		hirer: 'Lương Ngọc Vũ',
		date: '23/12/2019',
		status: 0,
		cost: '15,000'
	}
];

class ViewListContract extends React.Component {
	state = {
		filteredInfo: null,
		sortedInfo: null
	};

	render() {
		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};

		const listContract = data.map((item) => ({
			id: item.id,
			tutor: item.tutor,
			hirer: item.hirer,
			date: item.date,
			status:
				item.status === 0 ? (
					<Tag color="blue">Chờ xác nhận</Tag>
				) : item.status === 1 ? (
					<Tag color="green">Đang thuê</Tag>
				) : (
					<Tag color="orange">Đã kết thúc</Tag>
				),
			cost: '15,000',
			action: (
				<span style={{ display: 'flex', flexDirection: 'row' }}>
					<Link
						to="/admin-normal/detailContract"
						size="large"
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						<Button type="primary" icon="eye" />
					</Link>

					<Link to="#" size="large" type="primary" htmlType="submit" className="login-form-button">
						<Button type="danger" icon="stop" />
					</Link>
				</span>
			)
		}));
		return (
			<div>
				<div style={{ width: 'auto', margin: '5px 5px' }}>
					<Text strong style={{ fontSize: 20 }}>
						Danh sách hợp đồng
					</Text>
					<div style={{ float: 'right' }}>
						{' '}
						<Search
							placeholder="Tìm người dùng"
							enterButton
							onSearch={(value) => console.log(value)}
							style={{ width: 200, marginRight: 10 }}
						/>
						<Select
							defaultValue="all"
							showSearch
							style={{ width: 200 }}
							placeholder="Select a person"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							<Option value="all">Tất cả</Option>
							<Option value="hirer">Người thuê</Option>
							<Option value="tutor">Gia sư</Option>
						</Select>
					</div>
				</div>
				<Table columns={columns} dataSource={listContract} onChange={this.handleChange} />
			</div>
		);
	}
}

export default ViewListContract;
