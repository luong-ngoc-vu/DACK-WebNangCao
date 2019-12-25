import React from 'react';
import { Link } from 'react-router-dom';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import { Button, Card, Col, Rate, Row, Icon, Tag } from 'antd';
import { getProvinces } from 'sub-vn';

class OutstandingTutorList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			dataTutorialCity: [],
			provinceName: '',
			checkChooseCity: false
		};
	}

	componentDidMount() {
		fetch('http://localhost:4000/user/getTutorialUser')
			.then((response) => response.json())
			.then((data) => this.setState({ data: data }));
	}

	render() {
		const st = this.props;
		let data_tutorial = [];
		const { data, dataTutorialCity } = this.state;
		if (this.state.checkChooseCity === false) data_tutorial = data;
		else if (this.state.checkChooseCity === true) data_tutorial = dataTutorialCity;
		return (
			<div className="out-tutor">
				<div className="filter-tutor">
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							position: 'relative',
							width: '100%'
						}}
					>
						<h2 style={{ textAlign: 'left', margin: '20px 0px' }}>
							<strong>Gia sư nổi bật</strong>
						</h2>
						<Link
							to="/view-more-tutor"
							style={{
								position: 'absolute',
								right: 0
							}}
						>
							Xem tất cả gia sư <Icon type="plus-circle" />
						</Link>
					</div>
				</div>
				<div className="out-tutor__list">
					<Row gutter={[ 15, 15 ]}>
						{' '}
						{data_tutorial.map((teacher) => (
							<Col span={6}>
								<Link
									to={'detailTutor/' + teacher._id}
									size="large"
									onClick={(event) => {
										st.viewDetailTutor(teacher._id);
									}}
								>
									<Card
										style={{ minHeight: 400 }}
										hoverable="true"
										className="card-tutor"
										cover={
											<img
												style={{ width: '100%', maxHeight: 150, border: '0' }}
												alt="example"
												src={teacher.image}
											/>
										}
										actions={[
											<Button type="primary" className="btn-view-detail">
												Xem chi tiết
											</Button>
										]}
									>
										<div className="info-tutor">
											<p
												style={{
													fontWeight: 'bolder',
													color: '#008039',
													fontSize: 15,
													width: '100%'
												}}
											>
												{teacher.name}
											</p>
											<Rate disabled defaultValue={teacher.averagePoint} />
											<p>
												Địa chỉ: <strong>{teacher.provinceName}</strong>
											</p>
											<p>
												Học phí:{' '}
												<span style={{ fontWeight: 'bolder' }}>
													{teacher.money.toLocaleString('vi', {
														style: 'currency',
														currency: 'VND'
													})}
												</span>/<strong>h</strong>
											</p>
										</div>
										<hr style={{ border: '1px solid #e0e0e0' }} />
										<div>
											{teacher.skills.map((skill) => (
												<Tag style={{ fontWeight: 'bold', marginBottom: 5 }}>{skill}</Tag>
											))}
										</div>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
				</div>
			</div>
		);
	}
}

export default OutstandingTutorList;
