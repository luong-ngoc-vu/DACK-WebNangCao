import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import OrderContract from './ListContractOfTutor/ListContractOfTutor';
import { connect } from 'react-redux';
const { TabPane } = Tabs;

class ManageContract extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listAll: [],
			listDataPending: [],
			listDataRunning: [],
			listDataFinished: []
		};
	}

	componentDidMount() {
		console.log('Load');
		const { idTeacher } = this.props;

		fetch(`http://localhost:4000/contract/getListContractByIdTeacher/${idTeacher}`)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					listAll: data,
					listAll: data,
					listDataPending: data.filter((number) => number.status === 0),
					listDataRunning: data.filter((item) => item.status === 1),
					listDataFinished: data.filter((item) => item.status === 2)
				})
			)
			.catch((error) => {
				return error;
			});
	}
	render() {
		const { listDataPending, listDataRunning, listDataFinished } = this.state;

		return (
			<Tabs defaultActiveKey="1">
				<TabPane tab="Yêu cầu chờ phản hồi" key="1">
					<OrderContract listData={listDataPending} />
				</TabPane>
				<TabPane tab="Hợp đồng đang thuê" key="2">
					<OrderContract listData={listDataRunning} />
				</TabPane>
				<TabPane tab="Hợp đồng đã thuê" key="3">
					<OrderContract listData={listDataFinished} />
				</TabPane>
			</Tabs>
		);
	}
}
const mapStateToProps = (state) => ({
	isLogin: state.LoginReducer.isLogin,
	nameTeacher: state.LoginReducer.name,
	idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(ManageContract);
