import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './DetailTutor.css';

import {Col, Icon, Row, Tag, Typography} from 'antd';
import Contact from './FormContact/FormContact';

const {Text} = Typography;

class DetailTutor extends Component {
    render() {
        const st = this.props;
        console.log("Skills: " + st.skills[0]);
        const schedule = [21, 22, 31, 32, 33, 41, 71];
        const day = [
            'Thứ hai',
            'Thứ ba',
            'Thứ tư',
            'Thứ năm',
            'Thứ sáu',
            'Thứ bảy',
            'Chủ nhật'
        ];
        const Morning = () => {
            const temp = [];
            for (let i = 21; i <= 81; i += 10) {
                if (schedule.indexOf(i) !== -1) {
                    temp.push(
                        <Col span={3}>
                            <Tag
                                style={{
                                    fontSize: 14,
                                    width: 60,
                                    backgroundColor: '#37A000',
                                    color: 'white'
                                }}
                            >
                                Sáng
                            </Tag>
                        </Col>
                    );
                } else {
                    temp.push(
                        <Col span={3}>
                            <Tag style={{fontSize: 14, width: 60}}>Sáng</Tag>
                        </Col>
                    );
                }
            }
            return temp;
        };
        const Afternoon = () => {
            const temp = [];
            for (let i = 22; i <= 82; i += 10) {
                if (schedule.indexOf(i) !== -1) {
                    temp.push(
                        <Col span={3}>
                            <Tag
                                style={{
                                    fontSize: 14,
                                    width: 60,
                                    backgroundColor: '#37A000',
                                    color: 'white'
                                }}
                            >
                                Chiều
                            </Tag>
                        </Col>
                    );
                } else {
                    temp.push(
                        <Col span={3}>
                            <Tag style={{fontSize: 14, width: 60}}>Chiều</Tag>
                        </Col>
                    );
                }
            }
            return temp;
        };
        const Evening = () => {
            const temp = [];
            for (let i = 23; i <= 83; i += 10) {
                if (schedule.indexOf(i) !== -1) {
                    temp.push(
                        <Col span={3}>
                            <Tag
                                style={{
                                    fontSize: 14,
                                    width: 60,
                                    backgroundColor: '#37A000',
                                    color: 'white'
                                }}
                            >
                                Tối
                            </Tag>
                        </Col>
                    );
                } else {
                    temp.push(
                        <Col span={3}>
                            <Tag style={{fontSize: 14, width: 60}}>Tối</Tag>
                        </Col>
                    );
                }
            }
            return temp;
        };
        return (
            <Row>
                <Col span={18}>
                    {' '}
                    <div className="detail-tutor__info">
                        <Row className="general-info">
                            <Col span={7} style={{padding: '0px 15px 0px 0px'}}>
                                {' '}
                                <img
                                    className="avatar"
                                    src={st.image}
                                ></img>
                            </Col>
                            <Col span={17}>
                                <div className="info-personal">
                                    <Text style={{fontSize: 20, marginBottom: 10}}>
                                        {st.name}
                                    </Text>
                                    <Text
                                        style={{
                                            marginBottom: 10,
                                            float: 'left',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <Icon type="environment"/>
                                        &ensp;Địa chỉ:
                                        <span style={{fontWeight: 500}}>
                      &ensp; {st.address}
                    </span>
                                    </Text>
                                    <Text style={{marginBottom: 10}}>
                                        <Icon type="dollar"/>
                                        &ensp;Giá thuê:&ensp;
                                        <span style={{fontWeight: 500}}>150,000 vnđ/h</span>
                                    </Text>
                                    <Text>
                                        <Icon type="user"/>
                                        &ensp;Hiện đang là:&ensp;
                                        <span style={{fontWeight: 500}}>Sinh viên</span>
                                    </Text>
                                    <Row
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Col span={8} className="beside-info">
                                            <Text className="rate-text">10</Text>
                                            <Text>Lớp đã nhận</Text>
                                        </Col>

                                        <Col span={8} className="beside-info">
                                            {' '}
                                            <Text className="rate-text">0</Text>
                                            <Text>Lần bị phàn nàn</Text>
                                        </Col>
                                        <Col span={8} className="beside-info">
                                            <Text className="rate-text">100</Text>
                                            <Text>Điểm đánh giá</Text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="profile-tutor">
                            <Text className="title-info">Giới thiệu chung</Text>
                            <Text>
                                {st.moreInfo}
                            </Text>
                            <Text className="title-info">Kinh nghiệm đi dạy</Text>
                            <Text>
                                Hoa dong nhanh nhen va luon nhiet tinh trong cong viec
                            </Text>
                            <Text className="title-info">Chủ đề dạy</Text>
                            {st.skills !== undefined && (
                                <div>
                                    {st.skills.map(item => (
                                        <Tag style={{fontSize: 14}}>{item}</Tag>
                                    ))}
                                </div>
                            )}
                            {st.skills === null && (
                                <div>
                                    <Tag style={{fontSize: 14}}>Chưa cập nhật</Tag>
                                </div>
                            )}
                            <Text className="title-info">Lịch dạy</Text>

                            <div style={{width: '100%'}}>
                                <Row style={{width: '100%'}}>
                                    {day.map(item => (
                                        <Col span={3}>
                                            <Text>{item}</Text>
                                        </Col>
                                    ))}
                                </Row>
                                <Row style={{margin: '5px 0px'}}>
                                    <Morning/>
                                </Row>
                                <Row style={{margin: '5px 0px'}}>
                                    <Afternoon/>
                                </Row>
                                <Row style={{margin: '5px 0px'}}>
                                    <Evening/>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <Contact/>
                </Col>
            </Row>
        );
    }
}

export default DetailTutor;
