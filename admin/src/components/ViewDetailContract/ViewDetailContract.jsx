import React, {Component} from 'react';

import 'antd/dist/antd.css';
import './ViewDetailContract.css';
import {Button, Col, Icon, Row, Select, Tabs, Tag, Typography} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

const {Option} = Select;
const {Text} = Typography;
const {TabPane} = Tabs;

class ViewDetailContract extends Component {

    state = {
        item: [],
        dataTeacher: [],
        dataStudent: []
    };

    componentDidMount() {
        const {idContract, idTeacher, idStudent} = this.props;
        fetch(`http://localhost:4000/contract/contractByIdContract/${idContract}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({item: data});
            })
            .catch((error) => {
                return error;
            });
        fetch(`http://localhost:4000/admin/getUserId/${idTeacher}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({dataTeacher: data});
            })
            .catch((error) => {
                return error;
            });
        fetch(`http://localhost:4000/admin/getUserId/${idStudent}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({dataStudent: data});
            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        const {item, dataStudent, dataTeacher} = this.state;
        const {isLogin} = this.props;
        if (isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }
        return (
            <div>
                <div>
                    <Row gutter={20}>
                        <Col span={20}>
                            <div className="header-detail-contract">
                                <Link to="/admin-normal/contract">
                                    <Button type="default" icon="arrow-left"/>
                                </Link>
                                <Text strong style={{fontSize: 20, marginLeft: 10}}>
                                    Chi tiết hợp đồng mã số: {item.idContract} &ensp;
                                </Text>
                                {item.status === 0 ? (
                                    <Tag color="blue" style={{height: 25}}>Chờ xác nhận</Tag>
                                ) : item.status === 1 ? (
                                    <Tag color="green" style={{height: 25}}>Đang thuê</Tag>
                                ) : item.status === 2 ? (
                                    <Tag color="orange" style={{height: 25}}>Đã kết thúc</Tag>
                                ) : item.status === -1 ? (
                                    <Tag color="red" style={{height: 25}}>Bị từ chối</Tag>
                                ) : (
                                    <Tag color="yellow" style={{height: 25}}>Khiếu nại</Tag>
                                )}
                                <Text style={{position: 'absolute', right: 0}}>{item.date}</Text>
                            </div>

                            <Row style={{margin: '10px 0px', borderBottom: '1px solid #e0e0e0'}}>
                                <Col span={1}/>
                                <Col span={4}>
                                    <img
                                        src={dataTeacher.image}
                                        className="avatar-user"
                                    />
                                </Col>
                                <Col span={19}>
                                    <div className="info-user">
                                        <div className="info-tutor" style={{width: '100%', position: 'relative'}}>
                                            <div style={{marginBottom: 5, width: '100%', display: 'flex'}}>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        color: '#1890FF'
                                                    }}
                                                >
                                                    Gia sư:&ensp;{item.nameTeacher}
                                                </Text>
                                            </div>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="idcard"/>
                                                &ensp;Mã hợp đồng:&ensp;
                                                <span style={{fontWeight: 500}}>{item.idContract}</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="calendar"/>
                                                &ensp;Bắt đầu hợp đồng:&ensp;
                                                <span style={{fontWeight: 500}}>{item.dateContract}</span>
                                            </Text>
                                            {item.status === 2 && (
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="container"/>
                                                    &ensp;Kết thúc hợp đồng:&ensp;
                                                    <span style={{fontWeight: 500}}>{item.dateContractEnd}</span>
                                                </Text>
                                            )}
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="woman"/>
                                                &ensp;Giới tính giáo viên:&ensp;
                                                <span style={{fontWeight: 500}}>{dataTeacher.gender}</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="dollar"/>
                                                &ensp;Giá thuê:&ensp;
                                                <span
                                                    style={{fontWeight: 500}}>{item.moneyTeacherPerHour} VNĐ/giờ</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="euro"/>
                                                &ensp;Tổng tiền thuê:&ensp;
                                                <span style={{fontWeight: 500}}>{item.totalMoneyContract} VNĐ</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="phone"/>
                                                &ensp;Số điện thoại:&ensp;
                                                <span style={{fontWeight: 500}}>{dataTeacher.phone}</span>
                                            </Text>
                                            <Text
                                                style={{
                                                    marginBottom: 5,
                                                    float: 'left',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <Icon type="environment"/>
                                                &ensp;Địa chỉ gia sư:
                                                <span style={{fontWeight: 500}}>&ensp;
                                                    {dataTeacher.address}, {dataTeacher.wardName}, {dataTeacher.districtName},{' '}
                                                    {dataTeacher.provinceName}
                                                </span>
                                            </Text>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    width: '100%',
                                                    margin: '5px 0px'
                                                }}
                                            >
                                                <Text style={{marginRight: 10}}>
                                                    <Icon type="appstore"/>&ensp;Chủ đề dạy:{' '}
                                                </Text>
                                                {item.skills !== undefined && (
                                                    <div>
                                                        {item.skills.map((item) => (
                                                            <Tag style={{fontSize: 16}}>{item}</Tag>
                                                        ))}
                                                    </div>
                                                )}
                                                {item.skills === null && (
                                                    <div>
                                                        <Tag style={{fontSize: 16}}>Chưa cập nhật</Tag>
                                                    </div>
                                                )}
                                            </div>
                                            {item.noiDungKhieuNaiGV !== "" && item.status === -2 && (
                                                <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                                    <Icon type="home"/>
                                                    &ensp;Nội dung khiếu nại từ giáo viên:&ensp;
                                                    <span style={{fontWeight: 500}}>
                                                        {item.noiDungKhieuNaiGV}
											        </span>
                                            </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={1}/>
                                <Col span={4}>
                                    <img
                                        className="avatar-user"
                                        src={dataStudent.image}
                                        alt=""
                                    />
                                </Col>
                                <Col span={19}>
                                    <div className="info-hirer">
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: '#1890FF',
                                                marginBottom: 5
                                            }}
                                        >
                                            Người thuê:&ensp;{item.nameStudent}
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="woman"/>
                                            &ensp;Giới tính học viên:&ensp;
                                            <span style={{fontWeight: 500}}>{dataStudent.gender}</span>
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="phone"/>
                                            &ensp;Số điện thoại:&ensp;
                                            <span style={{fontWeight: 500}}>{dataStudent.phone}</span>
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="book"/>&ensp;Môn thuê: <Tag
                                            style={{fontSize: 16}}>{item.skills}</Tag>
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="clock-circle"/>
                                            &ensp;Số giờ mỗi buổi:&ensp;
                                            <span style={{fontWeight: 500}}>{item.hourPerLesson} giờ/buổi</span>
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="table"/>
                                            &ensp;Số buổi:&ensp;
                                            <span style={{fontWeight: 500}}>{item.numberOfLesson} buổi</span>
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="team"/>
                                            &ensp;Số người học:&ensp;
                                            <span style={{fontWeight: 500}}>3</span>
                                        </Text>
                                        <Text style={{marginBottom: 5}}>
                                            <Icon type="schedule"/>
                                            &ensp;Lịch học:&ensp;
                                            <span style={{fontWeight: 500}}>{item.schedule}</span>
                                        </Text>
                                        <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                            <Icon type="home"/>
                                            &ensp;Địa chỉ học:&ensp;
                                            <span style={{fontWeight: 500}}>
												{item.address}, {item.wardName}, {item.districtName},{' '}
                                                {item.provinceName}
											</span>
                                        </Text>
                                        {item.noiDungKhieuNaiHS !== "" && item.status === -2 && (
                                            <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                                <Icon type="close-circle"/>
                                                &ensp;Nội dung khiếu nại từ học sinh:&ensp;
                                                <span style={{fontWeight: 500}}>
                                                 {item.noiDungKhieuNaiHS}
											</span>
                                            </Text>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <div style={{width: '100%'}}>
                                {item.status === -2 && (
                                    <Button size="large" type="default" className="action-button"
                                            onClick={event => {
                                                const newStatus = 1;
                                                fetch(`http://localhost:4000/contract/changeStatus/${item.idContract}/${newStatus}`,
                                                    {method: 'PUT'})
                                                    .then((response) => response.json())
                                                    .then((data) => {
                                                            console.log(data);
                                                        }
                                                    )
                                                    .catch((error) => {
                                                        return error;
                                                    });
                                            }}>
                                        <Icon type="like"/>
                                        Tiếp hợp đồng
                                    </Button>
                                )}
                                {item.status === -2 && (
                                    <Button size="large" type="danger" className="action-button"
                                            onClick={event => {
                                                const newStatus = 2;
                                                fetch(`http://localhost:4000/contract/changeStatus/${item.idContract}/${newStatus}`,
                                                    {method: 'PUT'})
                                                    .then((response) => response.json())
                                                    .then((data) => {
                                                            console.log(data);
                                                        }
                                                    )
                                                    .catch((error) => {
                                                        return error;
                                                    });
                                            }}>
                                        <Icon type="delete"/>
                                        Hủy hợp đồng
                                    </Button>
                                )}
                                {item.status === -2 && (
                                    <Button size="large" type="primary" className="action-button">
                                        <Icon type="wechat"/>
                                        Xem hội thoại
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (st) => {
    return {
        idContract: st.ViewDetailUserReducer.idContract,
        idStudent: st.ViewDetailUserReducer.idStudent,
        idTeacher: st.ViewDetailUserReducer.idTeacher,
        isLogin: st.LoginReducer.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetailContract);
