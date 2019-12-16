import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Tabs, Row, Col } from 'antd';
import OrderContract from './ListContractOfTutor/ListContractOfTutor';

const { TabPane } = Tabs;

class ManageContract extends React.Component {
	render() {
		const listDataPending = [];
		for (let i = 0; i < 10; i++) {
			listDataPending.push({
				name: `Bùi Tuấn Vũ`,
				address: 'Đường 3/2, phường 14, quận 10, TP Hồ Chí Minh',
				position: `Sinh viên`,
				date: `20/12/2019`,
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				skills: [ 'Toán', 'Lý' ],
				status: 0
			});
		}
		const listDataRunning = [];
		for (let i = 0; i < 10; i++) {
			listDataRunning.push({
				name: `Bùi Tuấn Vũ`,
				address: 'Đường 3/2, phường 14, quận 10, TP Hồ Chí Minh',
				position: `Sinh viên`,
				date: `20/12/2019`,
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				skills: [ 'Toán', 'Lý' ],
				status: 1
			});
		}
		const listDataFinished = [];
		for (let i = 0; i < 10; i++) {
			listDataFinished.push({
				name: `Bùi Tuấn Vũ`,
				address: 'Đường 3/2, phường 14, quận 10, TP Hồ Chí Minh',
				position: `Sinh viên`,
				date: `20/12/2019`,
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				skills: [ 'Toán', 'Lý' ],
				status: 2
			});
		}
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
export default ManageContract;
