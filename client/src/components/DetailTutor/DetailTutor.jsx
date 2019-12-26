import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './DetailTutor.css';

import {Col, Icon, Rate, Row, Tag, Typography} from 'antd';
import InteractForm from './InteractForm/InteractForm';
import HistoryReview from './HistoryReview/HistoryReview';

const {Text} = Typography;

class DetailTutor extends Component {
    state = {
        hiringPending: 3,
        dataEvaluation: []
    };

    render() {
        const st = this.props;
        fetch(`https://apiclientwebsitethuegiasu.herokuapp.com/contract/checkContractHiring/${st.idUser}/${st.idTeacher}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({hiringPending: data});
            })
            .catch((error) => {
                return error;
            });

        fetch(`https://apiclientwebsitethuegiasu.herokuapp.com/contract/getListEvaluationByIdTeacher/${st.idTeacher}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({dataEvaluation: data});
            })
            .catch((error) => {
                return error;
            });
        const {dataEvaluation} = this.state;
        let sum = 0;
        dataEvaluation.map((item) => {
            sum = sum + item.point;
        });
        const averagePoint = Math.floor(sum / dataEvaluation.length);
        const schedule = st.teacherTimeDay;
        const day = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
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
                                <img alt="alt" className="avatar" src={st.image}/>
                            </Col>
                            <Col span={17}>
                                <div className="info-personal">
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                            color: '#14bff4',
                                            marginBottom: 10
                                        }}
                                    >
                                        {st.name}
                                    </Text>
                                    <Text
                                        style={{
                                            marginBottom: 10
                                        }}
                                    >
                                        {st.gender === 'Nam' && <Icon type="man"/>}
                                        {st.gender === 'Nữ' && <Icon type="woman"/>}
                                        &ensp;Giới tính:&ensp;
                                        <span style={{fontWeight: 500}}>{st.gender}</span>
                                    </Text>
                                    <Text style={{marginBottom: 10}}>
                                        <Icon type="container"/>
                                        &ensp;Trình độ học vấn:&ensp;
                                        <span style={{fontWeight: 500}}>{st.levelStudy}</span>
                                    </Text>
                                    <Text style={{marginBottom: 10}}>
                                        <Icon type="user"/>
                                        &ensp;Hiện đang là:&ensp;
                                        <span style={{fontWeight: 500}}>{st.curPosition}</span>
                                    </Text>
                                    <Text style={{marginBottom: 10}}>
                                        <Icon type="phone"/>
                                        &ensp;Số điện thoại:&ensp;
                                        <span style={{fontWeight: 500}}>
											{st.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
										</span>
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
											&ensp;{' '}
                                            {st.address +
                                            ', ' +
                                            st.wardName +
                                            ', ' +
                                            st.districtName +
                                            ', ' +
                                            st.provinceName}
										</span>
                                    </Text>
                                    <Text style={{marginBottom: 10}}>
                                        <Icon type="dollar"/>
                                        &ensp;Giá thuê:&ensp;
                                        <span style={{fontWeight: 500}}>
											{st.money.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}/h
										</span>
                                    </Text>

                                    <Text>
                                        <Icon type="star"/>
                                        &ensp;Tỉ lệ đánh giá:&ensp;
                                        <Rate disabled value={averagePoint}/>
                                    </Text>
                                    <Row
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Col span={8} className="beside-info">
                                            <Text className="rate-text">{dataEvaluation.length}</Text>
                                            <Text>Lớp đã nhận</Text>
                                        </Col>

                                        <Col span={8} className="beside-info">
                                            {' '}
                                            <Text className="rate-text">0</Text>
                                            <Text>Lần bị khiếu nại</Text>
                                        </Col>
                                        <Col span={8} className="beside-info">
                                            <Text className="rate-text">{dataEvaluation.length}</Text>
                                            <Text>Lớp hoàn thành</Text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="profile-tutor">
                            <Text className="title-info">Giới thiệu chung</Text>
                            <Text>{st.moreInfo}</Text>
                            <Text className="title-info">Kinh nghiệm đi dạy</Text>
                            <Text>{st.certificates}</Text>
                            <Text className="title-info">Chủ đề dạy</Text>
                            <div>{st.skills.map((item) => <Tag style={{fontSize: 14}}>{item}</Tag>)}</div>

                            <Text className="title-info">Lịch dạy</Text>
                            <div style={{width: '100%'}}>
                                <Row style={{width: '100%'}}>
                                    {day.map((item) => (
                                        <Col span={3}>
                                            <Text>
                                                <strong>{item}</strong>
                                            </Text>
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
                            <Text className="title-info">Nhận xét của các học viên</Text>

                            <HistoryReview dataEvaluation={dataEvaluation}/>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <InteractForm hiringPending={this.state.hiringPending} emailTutor={this.props.email}/>
                </Col>
            </Row>
        );
    }
}

export default DetailTutor;
