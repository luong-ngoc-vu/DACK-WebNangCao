import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import OrderContract from './ListContractOfHirer/ListContractOfHirer';
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
		const { idStudent } = this.props;
		console.log(idStudent);
		fetch(`http://localhost:4000/contract/getListContractByIdStudent/${idStudent}`)
			.then((response) => response.json())
			.then((data) => this.setState({ listAll: data, listDataPending: data }))
			.catch((error) => {
				return error;
			});
	}
	render() {
		const { listDataPending, listDataRunning, listDataFinished } = this.state;
		console.log(listDataPending);
		return (
			<Tabs defaultActiveKey="1">
				<TabPane tab="Yêu cầu chờ phản hồi" key="1">
					<OrderContract listData={listDataPending} />
				</TabPane>
				<TabPane tab="Gia sư đang thuê" key="2">
					<OrderContract listData={listDataRunning} />
				</TabPane>
				<TabPane tab="Gia sư đã thuê" key="3">
					<OrderContract listData={listDataFinished} />
				</TabPane>
			</Tabs>
		);
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.LoginReducer.isLogin,
	nameStudent: state.LoginReducer.name,
	idStudent: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(ManageContract);
