import React from 'react';
import 'antd/dist/antd.css';
import './ProfileHirer.css';

import Redirect from 'react-router-dom/Redirect';
import { Avatar, Button, Form, Input, InputNumber, Select, Typography, Row, Col } from 'antd';
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from 'sub-vn';

const { TextArea } = Input;

const { Title } = Typography;

class ProfileForm extends React.Component {
	constructor(props) {
		super(props);
		this.provinceCode = '';
		this.provinceName = '';
		this.districtCode = '';
		this.districtName = '';
		this.wardCode = '';
		this.wardName = '';
		this.gender = '';
		this.err = '';
	}

	state = {
		loading: false,
		provinceCode: this.provinceCode,
		districtCode: this.districtCode,
		wardCode: this.wardCode,
		gender: this.gender
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	render() {
		const st = this.props;
		console.log('id: ' + st.idUser);

		if (st.isLogin === false) {
			return <Redirect to="/login" />;
		}

		if (st.typeUser === 2) {
			return <Redirect to="/tutor-manage" />;
		}

		return (
			<div>
				<Typography className="typo-data">
					<div>
						<Title level={4}>Cập nhật thông tin cá nhân</Title>
						<br />
						<Avatar size={150} src={st.image} />
						<Form style={{ padding: '0px 50px' }} layout="vertical" onSubmit={this.handleSubmit}>
							<Row gutter={15}>
								<Col span={12}>
									<Form.Item label="Tên đầy đủ">
										<Input
											size="large"
											defaultValue={st.name}
											name="name"
											onChange={(event) => {
												this.name = event.target.value;
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									{st.isLoginFB === false &&
									st.isLoginGG === false && (
										<Form.Item label="Giới tính">
											<Select
												defaultValue={st.gender}
												onChange={(value) => {
													this.setState({ gender: value });
												}}
												size="large"
											>
												<Select.Option value={'Nam'}>Nam</Select.Option>
												<Select.Option value={'Nữ'}>Nữ</Select.Option>
											</Select>
										</Form.Item>
									)}
								</Col>
							</Row>

							<Row gutter={15}>
								<Col span={12}>
									<Form.Item label="Địa chỉ email">
										<Input size="large" defaultValue={st.email} readOnly name="email" />
									</Form.Item>
								</Col>
								<Col span={12}>
									{st.isLoginFB === false &&
									st.isLoginGG === false && (
										<Form.Item label="Số điện thoại">
											<Input
												size="large"
												defaultValue={st.phone}
												onChange={(event) => {
													this.phone = event.target.value;
												}}
												name="phone"
											/>
										</Form.Item>
									)}
								</Col>
							</Row>

							<Row gutter={15}>
								<Col span={12}>
									{st.isLoginFB === false &&
									st.isLoginGG === false && (
										<Form.Item label="Chọn tỉnh/ Thành phố">
											<Select
												labelInValue
												defaultValue={{ key: st.provinceName }}
												onChange={(value) => {
													this.setState({
														provinceCode: value.key,
														provinceName: value.label
													});
												}}
												showSearch
												optionFilterProp="children"
												filterOption={(input, option) =>
													option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
													0}
												size="large"
											>
												{getProvinces().map((con) => (
													<Select.Option value={con.code}>{con.name}</Select.Option>
												))}
											</Select>
										</Form.Item>
									)}
								</Col>
								<Col span={6}>
									{st.isLoginFB === false &&
									st.isLoginGG === false && (
										<Form.Item label="Chọn huyện/ thị xã">
											<Select
												showSearch
												labelInValue
												defaultValue={{ key: st.districtName }}
												onChange={(value) => {
													this.setState({
														districtCode: value.key,
														districtName: value.label
													});
												}}
												optionFilterProp="children"
												filterOption={(input, option) =>
													option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
													0}
												size="large"
											>
												{getDistrictsByProvinceCode(this.state.provinceCode).map((con) => (
													<Select.Option value={con.code}>{con.name}</Select.Option>
												))}
											</Select>
										</Form.Item>
									)}
								</Col>
								<Col span={6}>
									{st.isLoginFB === false &&
									st.isLoginGG === false && (
										<Form.Item label="Chọn phường">
											<Select
												defaultValue={{ key: st.wardName }}
												labelInValue
												onChange={(value) => {
													this.setState({ wardCode: value.key, wardName: value.label });
												}}
												showSearch
												optionFilterProp="children"
												filterOption={(input, option) =>
													option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
													0}
												size="large"
											>
												{getWardsByDistrictCode(this.state.districtCode).map((con) => (
													<Select.Option value={con.code}>{con.name}</Select.Option>
												))}
											</Select>
										</Form.Item>
									)}
								</Col>
							</Row>

							{st.isLoginFB === false &&
							st.isLoginGG === false && (
								<Form.Item label="Địa chỉ số nhà cụ thể">
									<Input
										size="large"
										defaultValue={st.address}
										onChange={(event) => {
											this.address = event.target.value;
										}}
										name="address"
									/>
								</Form.Item>
							)}
							{st.isLoginFB === false &&
							st.isLoginGG === false && (
								<Form.Item label={<span>Số tiền hiện có&nbsp;</span>}>
									<InputNumber
										style={{ width: '100%' }}
										defaultValue={st.curMoney}
										min={50000}
										onChange={(event) => {
											this.curMoney = event.valueOf();
										}}
										step={10000}
										size="large"
										formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									/>
								</Form.Item>
							)}
							{st.isLoginFB === false &&
							st.isLoginGG === false && (
								<Form.Item label="Thông tin mô tả bản thân">
									<TextArea
										rows={3}
										defaultValue={st.moreInfo}
										name="moreInfo"
										onChange={(event) => {
											this.moreInfo = event.target.value;
										}}
									/>
								</Form.Item>
							)}
							{st.isLoginFB === false &&
							st.isLoginGG === false && (
								<Form.Item label="Avatar URL">
									<Input
										size="large"
										defaultValue={st.image}
										name="image"
										onChange={(event) => {
											this.image = event.target.value;
										}}
									/>
								</Form.Item>
							)}
							{st.isLoginFB === false &&
							st.isLoginGG === false && (
								<Form.Item label="Choose Avatar">
									<Input
										size="large"
										type="file"
										name="file"
										onChange={async (e) => {
											const { files } = e.target;
											const data = new FormData();
											data.append('file', files[0]);
											data.append('upload_preset', 'jq0gfqp1');
											data.append('api_key', '725237476677898');
											data.append('api_secret', '5bN8m-49GwuIPffqiipf20h9eLI');

											const res = await fetch(
												'https://api.cloudinary.com/v1_1/dtrty0qol/image/upload',
												{
													method: 'POST',
													body: data
												}
											);
											const file = await res.json();
											this.image = file.url;
										}}
									/>
								</Form.Item>
							)}
							<div>
								<strong>{this.err}</strong>
							</div>
							{st.isLogin === true &&
							st.isLoginGG === false &&
							st.isLoginFB === false && (
								<Form.Item
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center'
									}}
								>
									<Button
										style={{ width: '150px', margin: '10px 300px' }}
										size="large"
										type="primary"
										htmlType="submit"
										className="btn-sign-up"
										onClick={(event) => {
											st.updateUser(
												this.name,
												this.phone,
												st.email,
												this.image,
												this.state.gender,
												this.address,
												this.state.provinceName,
												this.state.districtName,
												this.state.wardName,
												this.moreInfo,
												this.curMoney
											);
											this.err = 'Cập nhật thành công';
										}}
									>
										Cập nhật
									</Button>
								</Form.Item>
							)}
						</Form>
					</div>
				</Typography>
			</div>
		);
	}
}

const ProfileHirer = Form.create({ name: 'profile_form' })(ProfileForm);
export default ProfileHirer;
