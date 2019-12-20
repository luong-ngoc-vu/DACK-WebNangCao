import React, { Component } from 'react';
import './ListContractOfTutor.css';
import 'antd/dist/antd.css';
import { List, Avatar, Icon, Button, Divider, Tag, Typography, Select, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;
class OrderContract extends Component {
	render() {
		const { listData } = this.props;
		return (
			<div style={{ display: 'flex', flexDirection: 'column', padding: '5px 0px' }}>
				<div className="filter-action">
					<Select defaultValue="down" style={{ width: 150 }} placeholder="Sắp xếp danh sách">
						<Option value="down">Ngày giảm dần</Option>
						<Option value="up">Ngày tăng dần</Option>
					</Select>
				</div>
				<List
					style={{ minHeight: 400, marginRight: 10 }}
					size="large"
					pagination={{
						onChange: (page) => {
							console.log(page);
						},
						pageSize: 2
					}}
					className="demo-loadmore-list"
					itemLayout="horizontal"
					dataSource={listData}
					renderItem={(item) => (
						<List.Item
							actions={
								item.status === 0 ? (
									[
										<Button size="large" icon="check" type="primary" key="list-loadmore-edit" />,
										<Button size="large" icon="close" type="danger" key="list-loadmore-edit" />
									]
								) : item.status === 1 ? (
									[
										<Button
											size="large"
											icon="check-circle"
											type="primary"
											key="list-loadmore-edit"
										/>,
										<Button size="large" icon="stop" type="danger" key="list-loadmore-edit" />
									]
								) : (
									[ <Button size="large" icon="warning" type="danger" key="list-loadmore-edit" /> ]
								)
							}
						>
							<List.Item.Meta
								avatar={
									<Avatar
										size="large"
										style={{ minHeight: 100, minWidth: 100 }}
										src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									/>
								}
								description={
									<div>
										<div className="item-list-info-tutor">
											<div
												className="info-personal"
												style={{ width: '100%', position: 'relative' }}
											>
												<div
													style={{
														width: '100%',
														backgroundColor: '#22A6F2',
														marginBottom: '10px'
													}}
												>
													<Text style={{ fontSize: 16, color: 'white' }}>
														Hợp đồng: {item.idContract} - Phí nhận: 500,000 vnđ
													</Text>
												</div>
												<div style={{ marginBottom: 5, position: 'relative', width: '100%' }}>
													<Text
														style={{
															fontSize: 20,
															position: 'absolute',
															left: 0,
															color: '#1890FF'
														}}
													>
														{item.nameTeacher}
													</Text>
													{item.status === 0 ? (
														<Tag color="blue">Chờ xác nhận</Tag>
													) : item.status === 1 ? (
														<Tag color="green">Đang thuê</Tag>
													) : (
														<Tag color="orange">Đã kết thúc</Tag>
													)}
													<Text style={{ position: 'absolute', right: 0 }}>{item.date}</Text>
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
										<div className="item-list-info-hire">
											<Text
												style={{
													fontSize: 20,
													color: '#1890FF',
													marginBottom: 5,
													marginTop: 10
												}}
											>
												Người thuê:&ensp;{item.nameStudent}
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="woman" />
												&ensp;Giới tính học viên:&ensp;
												<span style={{ fontWeight: 500 }}>Nữ</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="phone" />
												&ensp;Số điện thoại:&ensp;
												<span style={{ fontWeight: 500 }}>0335 205 969</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="book" />&ensp;Môn thuê:{' '}
												{item.skills.map((item) => <Tag style={{ fontSize: 16 }}>{item}</Tag>)}
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="clock-circle" />
												&ensp;Số giờ mỗi buổi:&ensp;
												<span style={{ fontWeight: 500 }}>{item.hourPerLesson} giờ/buổi</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="table" />
												&ensp;Số buổi:&ensp;
												<span style={{ fontWeight: 500 }}>{item.numberOfLesson} buổi</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="team" />
												&ensp;Số người học:&ensp;
												<span style={{ fontWeight: 500 }}>3</span>
											</Text>
											<Text style={{ marginBottom: 5 }}>
												<Icon type="schedule" />
												&ensp;Lịch học:&ensp;
												<span style={{ fontWeight: 500 }}>{item.schedule.toString()}</span>
											</Text>
											<Text style={{ marginBottom: 5, textAlign: 'left' }}>
												<Icon type="home" />
												&ensp;Địa chỉ học:&ensp;
												<span style={{ fontWeight: 500 }}>
													{item.address}, {item.wardName}, {item.districtName},{' '}
													{item.provinceName}
												</span>
											</Text>
										</div>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}
export default OrderContract;
