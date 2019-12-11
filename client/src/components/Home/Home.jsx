import React from 'react';
import OutstandingTutorListContainer from './OutstandingTutorList/OutstandingTutorListContainer';
import {Col, Row} from 'antd';

class Home extends React.Component {
    render() {
        return (
            <Row>
                <Col span={3}></Col>
                <Col span={18}>
                    <OutstandingTutorListContainer/>
                </Col>
            </Row>
        );
    }
}

export default Home;
