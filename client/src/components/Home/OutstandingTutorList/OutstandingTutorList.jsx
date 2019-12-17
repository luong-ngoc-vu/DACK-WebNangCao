import React from 'react';
import {Link} from 'react-router-dom';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import {Button, Card, Col, Row, Select, Tag} from 'antd';
import axios from 'axios';

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
        return axios
            .post('http://localhost:4000/user/getTutorialCity', {
                addressCity
            })
            .catch(error => {
                return error;
            });
    }

    handleChange = (value) => {
        this.OnClick(value).then(r =>
            this.setState({dataTutorialCity: r.data, addressCity: value})
        );
    };

    componentDidMount() {
        fetch('http://localhost:4000/user/getTutorialUser')
            .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    render() {
        const st = this.props;
        const {data, dataTutorialCity} = this.state;
        return (
            <div className="out-tutor">
                <div className="filter-tutor">
                    <h2 style={{textAlign: 'left', margin: '20px 0px'}}>
                        Gia sư nổi bật
                    </h2>
                    <Select
                        style={{marginBottom: 10}}
                        name="addressCity"
                        defaultValue="Chọn thành phố"
                        onChange={this.handleChange}
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
                        <Select.Option value={'Chọn thành phố'}>
                            Chọn thành phố
                        </Select.Option>
                        <Select.Option value={'Thành phố Hồ Chí Minh'}>
                            Thành phố Hồ Chí Minh
                        </Select.Option>
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
                </div>
                <div className="out-tutor__list">
                    <Row gutter={[24, 16]}>
                        {' '}
                        {this.state.addressCity === 'Chọn thành phố' &&
                        data.map(teacher => (
                            <Col span={6}>
                                <Link
                                    to={"detailTutor/" + (teacher._id)}
                                    size="large"
                                    onClick={event => {
                                        st.viewDetailTutor(teacher._id);
                                    }}
                                >
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
                                                    fontSize: 16
                                                }}
                                            >
                                                {teacher.name}
                                            </p>
                                            <p>Địa chỉ: {teacher.addressCity}</p>
                                            <p>
                                                Học phí:{' '}
                                                <span style={{fontWeight: 'bolder'}}>
                                                    {teacher.money} vnđ</span>/buổi
                                            </p>
                                        </div>
                                        <hr style={{border: '1px solid #e0e0e0'}}></hr>
                                        <div>
                                            <Tag style={{fontWeight: 'bold'}}>Toán ôn thi ĐH</Tag>
                                            <Tag style={{fontWeight: 'bold'}}>Lý ôn thi ĐH</Tag>
                                            <Tag style={{fontWeight: 'bold', marginTop: 5}}>
                                                Hóa ôn thi ĐH
                                            </Tag>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                        {this.state.addressCity !== 'Chọn thành phố' &&
                        dataTutorialCity.map(teacher => (
                            <Col span={6}>
                                <Link
                                    to={"detailTutor/" + (teacher._id)}
                                    size="large"
                                    onClick={event => {
                                        st.viewDetailTutor(teacher._id);
                                    }}
                                >
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
                                                    fontSize: 16
                                                }}
                                            >
                                                {teacher.name}
                                            </p>
                                            <p>Địa chỉ: {teacher.addressCity}</p>
                                            <p>
                                                Học phí:{' '}
                                                <span style={{fontWeight: 'bolder'}}>
                            140,000 vnđ
                          </span>
                                                /h
                                            </p>
                                        </div>
                                        <hr style={{border: '1px solid #e0e0e0'}}></hr>
                                        <div>
                                            <Tag style={{fontWeight: 'bold'}}>Toán ôn thi ĐH</Tag>
                                            <Tag style={{fontWeight: 'bold'}}>Lý ôn thi ĐH</Tag>
                                            <Tag style={{fontWeight: 'bold', marginTop: 5}}>
                                                Hóa ôn thi ĐH
                                            </Tag>
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
