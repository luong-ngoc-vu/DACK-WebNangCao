import React, { Component } from 'react';

import 'antd/dist/antd.css';
import './ViewDetailContract.css';
import { Icon, Button, Tag, Typography, Select, Tabs, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;
class ViewDetailContract extends Component {
	render() {
		const item = {
			name: `Bùi Tuấn Vũ`,
			address: 'Đường 3/2, phường 14, quận 10, TP Hồ Chí Minh',
			position: `Sinh viên`,
			date: `20/12/2019`,
			avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			skills: [ 'Toán', 'Lý' ],
			status: 1
		};
		return (
			<div>
				<div>
					<Row gutter={20}>
						<Col span={20}>
							<div className="header-detail-contract">
								<Link to="/admin-normal/contract">
									<Button type="default" icon="arrow-left" />
								</Link>
								<Text strong style={{ fontSize: 20, marginLeft: 10 }}>
									Xem chi tiết hợp đồng mã số: 2585115 &ensp;
								</Text>
								{item.status === 0 ? (
									<Tag color="blue" style={{ height: 25 }}>
										Chờ xác nhận
									</Tag>
								) : item.status === 1 ? (
									<Tag style={{ height: 25 }} color="green">
										Đang thuê
									</Tag>
								) : (
									<Tag style={{ height: 25 }} color="orange">
										Đã kết thúc
									</Tag>
								)}
								<Text style={{ position: 'absolute', right: 0 }}>{item.date}</Text>
							</div>

							<Row style={{ margin: '10px 0px', borderBottom: '1px solid #e0e0e0' }}>
								<Col span={1} />
								<Col span={4}>
									<img
										src="http://cdn.hoahoctro.vn/uploads/2019/09/5d8b08506bf5b-ne-zha-movie-still-600x450.jpg"
										className="avatar-user"
									/>
								</Col>
								<Col span={19}>
									<div className="info-user">
										<div className="info-tutor" style={{ width: '100%', position: 'relative' }}>
											<div style={{ marginBottom: 5, width: '100%', display: 'flex' }}>
												<Text
													style={{
														fontSize: 20,
														color: '#1890FF'
													}}
												>
													Gia sư:&ensp;{item.name}
												</Text>
											</div>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="idcard" />
												&ensp;Mã số:&ensp;
												<span style={{ fontWeight: 500 }}>102254</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="dollar" />
												&ensp;Giá thuê:&ensp;
												<span style={{ fontWeight: 500 }}>150,000 vnđ/h</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="phone" />
												&ensp;Số điện thoại:&ensp;
												<span style={{ fontWeight: 500 }}>0335 205 969</span>
											</Text>
											<Text
												style={{
													marginBottom: 5,
													float: 'left',
													textAlign: 'left'
												}}
											>
												<Icon type="environment" />
												&ensp;Địa chỉ:
												<span style={{ fontWeight: 500 }}>&ensp; {item.address}</span>
											</Text>

											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													width: '100%',
													margin: '5px 0px'
												}}
											>
												<Text style={{ marginRight: 10 }}>
													<Icon type="appstore" />&ensp;Chủ đề dạy:{' '}
												</Text>
												{item.skills !== undefined && (
													<div>
														{item.skills.map((item) => (
															<Tag style={{ fontSize: 16 }}>{item}</Tag>
														))}
													</div>
												)}
												{item.skills === null && (
													<div>
														<Tag style={{ fontSize: 16 }}>Chưa cập nhật</Tag>
													</div>
												)}
											</div>
										</div>
									</div>
								</Col>
							</Row>
							<Row>
								<Col span={1} />
								<Col span={4}>
									<img
										className="avatar-user"
										src="https://i.a4vn.com/2019/8/4/my-nhan-cbiz-bat-trend-cosplay-na-tra-luu-diec-phi-gay-sot-vi-qua-xinh-nguoi-thu-4-lai-giong-ban-goc-toi-bat-ngo-c2e6db.jpeg"
										alt=""
									/>
								</Col>
								<Col span={19}>
									<div className="info-hirer">
										<Text
											style={{
												fontSize: 20,
												color: '#1890FF',
												marginBottom: 5
											}}
										>
											Người thuê:&ensp;{item.name}
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="woman" />
											&ensp;Giới tính:&ensp;
											<span style={{ fontWeight: 500 }}>Nữ</span>
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="phone" />
											&ensp;Số điện thoại:&ensp;
											<span style={{ fontWeight: 500 }}>0335 205 969</span>
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="book" />&ensp;Môn thuê: <Tag style={{ fontSize: 16 }}>Toán</Tag>
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="clock-circle" />
											&ensp;Số giờ mỗi buổi:&ensp;
											<span style={{ fontWeight: 500 }}>2.5 giờ/buổi</span>
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="table" />
											&ensp;Số buổi:&ensp;
											<span style={{ fontWeight: 500 }}>15 buổi</span>
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="team" />
											&ensp;Số người học:&ensp;
											<span style={{ fontWeight: 500 }}>3</span>
										</Text>
										<Text style={{ marginBottom: 5 }}>
											<Icon type="schedule" />
											&ensp;Lịch học:&ensp;
											<span style={{ fontWeight: 500 }}>Thứ 2 - Sáng, Thứ 3 - Sáng</span>
										</Text>
										<Text style={{ marginBottom: 5, textAlign: 'left' }}>
											<Icon type="home" />
											&ensp;Địa chỉ học:&ensp;
											<span style={{ fontWeight: 500 }}>
												ĐƯờng Nam kỳ, phường Nam kỳ, quận 1, TP Hồ Chí Minh
											</span>
										</Text>
									</div>
								</Col>
							</Row>
						</Col>
						<Col span={4}>
							<div style={{ width: '100%' }}>
								<Button size="large" type="danger" className="action-button" onClick={this.showModal}>
									<Icon type="exception" />
									Hủy hợp đồng
								</Button>

								<Button size="large" type="primary" className="action-button">
									<Icon type="wechat" />
									Xem hội thoại
								</Button>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
export default ViewDetailContract;
