import React from 'react';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import {Button, Card, Col, Row, Select, Tag} from 'antd';

const {Option} = Select;

const {Meta} = Card;

class OutstandingTutorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:4000/user/getTutorialUser')
            .then(response => response.json())
            .then(data => this.setState({data}));
    }

    render() {
        const {data} = this.state;
        return (
            <div className="out-tutor">
                <h2 style={{textAlign: 'left', margin: '20px 0px'}}>
                    Gia sư nổi bật
                </h2>
                <Select defaultValue="lucy" style={{width: 120}}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <div className="out-tutor__list">
                    <Row gutter={[24, 16]}>
                        {' '}
                        {data.map(teacher =>
                            <Col span={6}>
                                <Card
                                    hoverable="true"
                                    className="card-tutor"
                                    cover={
                                        <img
                                            style={{width: '100%', height: 158, border: '0'}}
                                            alt="example"
                                            src={teacher.image}
                                        />
                                    }
                                    actions={[
                                        <Button type="primary" icon="plus">
                                            Xem chi tiết
                                        </Button>
                                    ]}
                                >
                                    <div className="info-tutor">
                                        <p
                                            style={{
                                                fontWeight: 'bolder',
                                                color: '#008039',
                                                fontSize: 16
                                            }}
                                        >
                                            {teacher.name}
                                        </p>
                                        <p>Địa chỉ: {teacher.addressCity}</p>
                                        <p>
                                            Học phí:{' '}
                                            <span style={{fontWeight: 'bolder'}}>140,000 vnđ</span>/h
                                        </p>
                                    </div>
                                    <hr style={{border: '1px solid #e0e0e0'}}></hr>
                                    <div>
                                        <Tag style={{fontWeight: 'bold'}}>
                                            <a href="https://github.com/ant-design/ant-design/issues/1862">
                                                Toán ôn thi ĐH
                                            </a>
                                        </Tag>
                                        <Tag style={{fontWeight: 'bold'}}>
                                            <a href="https://github.com/ant-design/ant-design/issues/1862">
                                                Lý ôn thi ĐH
                                            </a>
                                        </Tag>
                                        <Tag style={{fontWeight: 'bold', marginTop: 5}}>
                                            <a href="https://github.com/ant-design/ant-design/issues/1862">
                                                Hóa ôn thi ĐH
                                            </a>
                                        </Tag>
                                    </div>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        );
    }
}

export default OutstandingTutorList;
