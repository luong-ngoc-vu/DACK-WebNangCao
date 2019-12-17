import React from 'react';

import 'antd/dist/antd.css';
import './CreateSkill.css';
import { Button, Form, Input, Typography } from 'antd';

class CreateSkillForm extends React.Component {
	constructor() {
		super();
		this.name = '';
		this.err = '';
	}

	state = {
		confirmDirty: false,
		typeUser: 1,
		autoCompleteResult: []
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
		if (st.isCreateSkill === 'err') {
			this.err = 'Có lỗi trong quá trình xử lý, vui lòng thử lại !';
		}
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Typography>
					<div>
						<Form layout="vertical" onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
							<Form.Item>
								{getFieldDecorator('fullname', {
									rules: [
										{
											required: true,
											message: 'Vui lòng nhập tên kỹ năng'
										}
									]
								})(
									<Input
										size="large"
										placeholder="Nhập tên kỹ năng"
										onChange={(event) => {
											this.name = event.target.value;
										}}
										name="name"
										autoFocus
									/>
								)}
							</Form.Item>
							<Form.Item>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyItems: 'center',
										alignItems: 'center'
									}}
								>
									<b>{this.err}</b>
								</div>
							</Form.Item>
							<Form.Item>
								<Button
									size="large"
									type="primary"
									htmlType="submit"
									className="btn-sign-up"
									onClick={(event) => {
										event.preventDefault();
										if (this.name !== '') st.CreateSkill(this.name);
										this.err = 'Tạo mới Skill thành công !';
									}}
								>
									Tạo kỹ năng
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Typography>
			</div>
		);
	}
}

const CreateSkill = Form.create({ name: 'normal_Register' })(CreateSkillForm);
export default CreateSkill;
