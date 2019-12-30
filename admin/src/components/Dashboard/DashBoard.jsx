import React, { Component } from 'react';
import './DashBoard.css';
import 'antd/dist/antd.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { Redirect } from 'react-router-dom';
import { Input, Select, Table, Typography, Row, Col, Icon, Tooltip } from 'antd';
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress, yuan } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';
import { connect } from 'react-redux';
import TopDashBoard from './TopDashBoard/TopDashBoard';
import MiddleDashBoard from './MiddleDashBoard/MiddleDashBoard';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

class DashBoard extends Component {
	state = {
		filteredInfo: null,
		sortedInfo: null,
		allContracts: [],
		contractsByStatus: []
	};

	componentDidMount() {
		const { idTeacher } = this.props;

		fetch(`https://apiadminthuegiasu.herokuapp.com/contract/getListContractByIdTeacher/${idTeacher}`)
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
		return (
			<div style={{ padding: '10px 20px' }}>
				<Row>
					<TopDashBoard />
				</Row>
				<Row>
					<MiddleDashBoard />
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
export default connect(mapStateToProps, null)(DashBoard);
