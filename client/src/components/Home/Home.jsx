import React from 'react';
import BannerBackground from './BannerBackground/BannerBackground';
import OutstandingTutorList from './OutstandingTutorList/OutstandingTutorList';
import { Row, Col } from 'antd';

class Home extends React.Component {
  render() {
    return (
      <div>
        <BannerBackground />
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            <OutstandingTutorList />
          </Col>
          <Col span={3}></Col>
        </Row>
      </div>
    );
  }
}

export default Home;
