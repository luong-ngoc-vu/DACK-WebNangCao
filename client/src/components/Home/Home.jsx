import React from 'react';
import {ViewListOutStandingContainer} from './OutstandingTutorList/OutstandingTutorListContainer';
import { Col, Row } from 'antd';
import StepGuide from './StepGuide/StepGuide';

class Home extends React.Component {
  render() {
    return (
      <Row gutter={24}>
        <Col span={3}></Col>
        <Col span={18}>
          <ViewListOutStandingContainer />
          <StepGuide />
        </Col>
      </Row>
    );
  }
}

export default Home;
