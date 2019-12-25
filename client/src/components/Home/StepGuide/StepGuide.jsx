import React, { Component } from 'react';

import 'antd/dist/antd.css';
import './StepGuide.css';

import { Row, Col, Typography } from 'antd';
import step01 from './step01.png';
import step02 from './step02.png';
import step03 from './step03.png';
import step04 from './step04.png';

const { Text } = Typography;
class StepGuide extends Component {
	render() {
		return (
			<div style={{ margin: '20px 0px', backgroundColor: 'white' }}>
				<Text strong style={{ width: '100%', fontSize: 20, textAlign: 'center' }}>
					Thuê gia sư Bmentor
				</Text>
				<Row gutter={24}>
					<Col span={6} className="step-guide__item">
						<img src={step01} alt="Thuê gia sư" className="img-step-guide" />
						<div className="des-step-guide">
							<Text strong style={{ width: '100%', marginBottom: 10, fontSize: 17 }}>
								Tìm gia sư
							</Text>
							<Text>Tìm gia sư theo môn học chủ đề hay những yêu cầu của bạn</Text>
						</div>
					</Col>
					<Col span={6} className="step-guide__item">
						<img src={step02} alt="Thuê gia sư" className="img-step-guide" />
						<div className="des-step-guide">
							<Text strong style={{ width: '100%', marginBottom: 10, fontSize: 16 }}>
								Kết nối với gia sư
							</Text>
							<Text>
								Bạn hãy để lại các thông tin xác nhận muốn thuê gia sư và các thông tin liên quan đến
								giảng dạy, môn học, ngày giờ, ...
							</Text>
						</div>
					</Col>
					<Col span={6} className="step-guide__item">
						<img src={step03} alt="Thuê gia sư" className="img-step-guide" />
						<div className="des-step-guide">
							<Text strong style={{ width: '100%', marginBottom: 10, fontSize: 16 }}>
								Tạo hợp đồng thuê
							</Text>
							<Text>
								Trao đổi với gia sư để nhận được các thông tin chính xác liên quan đến gia sư và có thể
								trao đổi về việc thuê gia sư
							</Text>
						</div>
					</Col>
					<Col span={6} className="step-guide__item">
						<img src={step04} alt="Thuê gia sư" className="img-step-guide" />
						<div className="des-step-guide">
							<Text strong style={{ width: '100%', marginBottom: 10, fontSize: 16 }}>
								Xác nhận hợp đồng
							</Text>
							<Text>
								Sau khi hợp đồng thuê gia sư hoàn tất hãy thanh toán để đảm bảo tính chắc chắn của hợp
								đồng, không gây nhầm lẫn cho đôi bên.
							</Text>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default StepGuide;
