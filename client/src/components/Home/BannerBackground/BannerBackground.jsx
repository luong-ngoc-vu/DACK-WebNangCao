import React from 'react';
import './BannerBackground.css';
import 'antd/dist/antd.css';

import { Typography, Button } from 'antd';

const { Title } = Typography;

class BannerBackground extends React.Component {
  render() {
    return (
      <div className="banner-bg">
        <Typography className="title-bg">
          <Title style={{ color: 'white' }} level={2}>
            Tìm gia sư giỏi Bmentor
          </Title>
          <Title level={4} style={{ color: 'white' }}>
            Hãy để chúng tôi giúp bạn giỏi hơn và đi xa hơn với nền tảng gia sư
            công nghệ 4.0
          </Title>
          <Title level={3} style={{ color: 'white' }}>
            Nhanh chóng - Chủ động - Miễn phí!
          </Title>
        </Typography>
        <div className="btn-action-bg">
          <Button className="btn-action" size="large">
            Tìm gia sư
          </Button>
          <Button className="btn-action" size="large">
            Trở thành gia sư
          </Button>
        </div>
      </div>
    );
  }
}
export default BannerBackground;
