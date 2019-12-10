import React from 'react';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import {Button, Card, Col, Row, Select, Tag} from 'antd';
import axios from 'axios';

const {Option} = Select;

const {Meta} = Card;

class OutstandingTutorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTutorialCity: [],
            addressCity: 'Chọn thành phố'
        };
    }

    OnClick(addressCity) {
        return axios.post('http://localhost:4000/user/getTutorialCity', {
            addressCity
        }).catch(error => {
            return error;
        });
    }

    componentDidMount() {
        fetch('http://localhost:4000/user/getTutorialUser')
            .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    render() {
        const rs = this.OnClick(this.state.addressCity).then(r => this.setState({dataTutorialCity: r.data}));
        const {data, dataTutorialCity} = this.state;
        return (
            <div className="out-tutor">
                <h2 style={{textAlign: 'left', margin: '20px 0px'}}>
                    Gia sư nổi bật
                </h2>
                <Select
                    name="addressCity"
                    defaultValue="Chọn thành phố"
                    onChange={value => {
                        this.setState({addressCity: value});
                    }}
                    showSearch
                    width="100%"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    size="large"
                >
                    <Select.Option value={'Chọn thành phố'}>Chọn thành phố</Select.Option>
                    <Select.Option value={'Thành phố Hồ Chí Minh'}>Thành phố Hồ Chí
                        Minh</Select.Option>
                    <Select.Option value={'Hà Nội'}>Hà Nội</Select.Option>
                    <Select.Option value={'Đà Nẵng'}>Đà Nẵng</Select.Option>
                    <Select.Option value={'Huế'}>Huế</Select.Option>
                    <Select.Option value={'Quảng Nam'}>Quảng Nam</Select.Option>
                    <Select.Option value={'Quảng Ngãi'}>Quảng Ngãi</Select.Option>
                    <Select.Option value={'Quảng Bình'}>Quảng Bình</Select.Option>
                    <Select.Option value={'Bình Định'}>Bình Định</Select.Option>
                    <Select.Option value={'Bình Dương'}>Bình Dương</Select.Option>
                    <Select.Option value={'Bình Phước'}>Bình Phước</Select.Option>
                    <Select.Option value={'Tây Ninh'}>Tây Ninh</Select.Option>
                </Select>
                <div className="out-tutor__list">
                    <Row gutter={[24, 16]}>
                        {' '}
                        {this.state.addressCity === "Chọn thành phố" && data.map(teacher =>
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
                        {this.state.addressCity !== "Chọn thành phố" && dataTutorialCity.map(teacher =>
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
