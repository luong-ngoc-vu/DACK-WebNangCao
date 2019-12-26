import React, { Component } from 'react';
import 'antd/dist/antd.css';

import axios from 'axios';
import { Avatar, List, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Chat from '../../Chat/Chat';
import { connect } from 'react-redux';

const { Text } = Typography;
class ManageChat extends Component {
	state = {
		initLoading: true,
		loading: false,
		data: [],
		list: [],
		visible: false,
		recentTeacher: ''
	};

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	componentDidMount() {
		const { mailHirer } = this.props;
		axios.get(`https://apiclientwebsitethuegiasu.herokuapp.com/message/getUnread/${mailHirer}`).then((res) => {
			this.setState({ list: res.data });
		});
	}
	render() {
		const { list, visible, recentTeacher } = this.state;
		return (
			<div>
				<List
					className="demo-loadmore-list"
					itemLayout="horizontal"
					dataSource={list}
					renderItem={(item) => (
						<List.Item
							onClick={() => {
								this.showModal();
								this.setState({ recentTeacher: item.user });
								axios
									.put(`https://apiclientwebsitethuegiasu.herokuapp.com/message/markRead/${item.id}`)
									.then((result) => result.json())
									.catch((error) => console.log(error));
							}}
							style={{ padding: '20px 40px' }}
							actions={[ <Link key="list-loadmore-edit">Trả lời</Link> ]}
						>
							<List.Item.Meta
								style={{ float: 'left' }}
								avatar={
									<Avatar
										size="large"
										src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									/>
								}
								title={
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-start'
										}}
										href="https://ant.design"
									>
										<Link>
											<Text strong> {item.user}</Text>
										</Link>
									</div>
								}
							/>
							<div style={{ float: 'left' }}>{item.text}</div>
						</List.Item>
					)}
				/>
				<Modal
					title={`Chat với ${recentTeacher}`}
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
					style={{ top: 20 }}
				>
					<Chat emailTutor={recentTeacher} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	mailHirer: state.LoginReducer.email
});
export default connect(mapStateToProps, null)(ManageChat);
