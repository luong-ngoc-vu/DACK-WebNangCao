import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import OrderContract from './ListContractOfHirer/ListContractOfHirer';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';

const { TabPane } = Tabs;

class ManageContract extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listAll: [],
			listDataPending: [],
			listDataRunning: [],
			listDataFinished: [],
			listDataRejected: [],
			listDataComplained: []
		};
	}

	componentDidMount() {
		const { idStudent } = this.props;
		fetch(`http://localhost:4000/contract/getListContractByIdStudent/${idStudent}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					listAll: data,
					listDataComplained: data.filter((item) => item.status === -2),
					listDataRejected: data.filter((item) => item.status === -1),
					listDataPending: data.filter((item) => item.status === 0),
					listDataRunning: data.filter((item) => item.status === 1),
					listDataFinished: data.filter((item) => item.status === 2)
				});
			})
			.catch((error) => {
				return error;
			});
	}

	render() {
		const { listDataPending, listDataRunning, listDataFinished, listDataRejected, listDataComplained } = this.state;
		const { isLogin } = this.props;
		if (!isLogin) {
			return <Redirect to="/login" />;
		}
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
				<TabPane tab="Khiếu nại" key="4">
					<OrderContract listData={listDataComplained} />
				</TabPane>
				<TabPane tab="Yêu cầu bị từ chối" key="5">
					<OrderContract listData={listDataRejected} />
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
