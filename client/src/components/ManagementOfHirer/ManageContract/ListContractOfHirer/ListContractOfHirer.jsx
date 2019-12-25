import React, {Component} from 'react';
import './ListContractOfHirer.css';
import 'antd/dist/antd.css';
import {Avatar, Button, Form, Icon, Input, List, Modal, Rate, Select, Tabs, Tag, Typography} from 'antd';
import {connect} from "react-redux";
import moment from "moment";
import numeral from 'numeral';

const {Option} = Select;
const {Text} = Typography;
const {TabPane} = Tabs;
const desc = ['Quá tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'];
const {TextArea} = Input;

class OrderContract extends Component {
    state = {
        visibleReport: false,
        visibleHired: false,
        idContract: '',
        idStudent: '',
        dataStudent: '',
        name: '',
        titleEvaluation: '',
        contentEvaluation: '',
        nameStudent: '',
        imageTeacher: '',
        imageStudent: '',
        valueRate: 3,
    };
    showModalReport = e => {
        this.setState({
            visibleReport: true
        });
    };
    handleCancelReport = e => {
        console.log(e);
        this.setState({
            visibleReport: false
        });
    };
    handleCancelHired = e => {
        this.setState({
            visibleHired: false
        });
    };
    showModalHired = e => {
        this.setState({
            visibleHired: true
        });
    };
    handleChangeRate = value => {
        this.setState({valueRate: value});
    };

    componentDidMount() {
        const {idStudent, listData} = this.props;
        fetch(`http://localhost:4000/user/getUserById/${idStudent}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({dataStudent: data});
            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        const {listData} = this.props;
        const {dataStudent, valueRate} = this.state;

        return (
            <div style={{display: 'flex', flexDirection: 'column', padding: '5px 0px'}}>
                <div className="filter-action">
                    <Select defaultValue="down" style={{width: 150}} placeholder="Sắp xếp danh sách">
                        <Option value="up">Ngày tăng dần</Option>
                        <Option value="down">Ngày giảm dần</Option>
                    </Select>
                </div>
                <List
                    style={{minHeight: 400, marginRight: 15}}
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 2
                    }}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={listData}
                    renderItem={(item) => (
                        <List.Item style={{borderBottom:'2px solid #62BFFF'}}
                            actions={
                                item.status === 0 ? (
                                    [
                                        <Button
                                            size="large"
                                            icon="stop"
                                            type="danger"
                                            onClick={event => {
                                                const newStatus = -1;
                                                fetch(`http://localhost:4000/contract/changeStatus/${item.idContract}/${newStatus}`,
                                                    {method: 'PUT'})
                                                    .then((response) => response.json())
                                                    .then((data) => {
                                                        console.log(data);
                                                    })
                                                    .catch((error) => {
                                                        return error;
                                                    });
                                            }}
                                        />
                                    ]
                                ) : item.status === 1 ? (
                                    [
                                        <Button
                                            size="large"
                                            icon="check-circle"
                                            type="primary"
                                            onClick={event => {
                                                this.showModalHired();
                                                this.setState({
                                                    idContract: item.idContract,
                                                    idStudent: item.idStudent,
                                                    idTeacher: item.idTeacher,
                                                    nameStudent: item.nameStudent,
                                                    nameTeacher: item.nameTeacher,
                                                    imageTeacher: item.imgTeacher,
                                                    imageStudent: item.imgStudent,
                                                });
                                                const newStatus = 2;
                                                fetch(`http://localhost:4000/contract/changeStatusAndUpdateMoney/${item.idContract}/${newStatus}/${item.idStudent}/${item.idTeacher}`,
                                                    {method: 'PUT'})
                                                    .then((response) => response.json())
                                                    .then((data) => {
                                                            console.log(data);
                                                        }
                                                    )
                                                    .catch((error) => {
                                                        return error;
                                                    });
                                            }}/>,
                                        <Button
                                            size="large"
                                            icon="warning"
                                            type="danger"
                                            onClick={event => {
                                                this.showModalReport();
                                                this.setState({idContract: item.idContract, idStudent: item.idStudent});
                                                const newStatus = -2;
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
                                            }}/>
                                    ]
                                ) : (
                                    [null]
                                )

                            }
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        size="large"
                                        style={{minHeight: 100, minWidth: 100, marginTop: 35, marginLeft:10}}
                                        src={item.imgTeacher}
                                    />
                                }
                                description={
                                    <div>
                                        <div
                                            style={{
                                                marginBottom: 5,
                                                position: 'relative',
                                                width: '100%',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}
                                        >
                                            <Text
                                                strong
                                                style={{
                                                    fontSize: 16,
                                                    position: 'absolute',
                                                    left: 0
                                                }}
                                            >
                                                Mã hợp đồng:&ensp;{item.idContract}
                                            </Text>
                                            {item.status === 0 ? (
                                                <Tag color="blue">Chờ xác nhận</Tag>
                                            ) : item.status === 1 ? (
                                                <Tag color="green">Đang thuê</Tag>
                                            ) : item.status === 2 ? (
                                                <Tag color="orange">Đã kết thúc</Tag>
                                            ) : item.status === -1 ? (
                                                <Tag color="red">Bị từ chối</Tag>
                                            ) : (
                                                <Tag color="yellow">Khiếu nại</Tag>
                                            )}
                                            <Text style={{position: 'absolute', right: 0}}>
                                                {moment(item.dateContract).format('DD/MM/YYYY')}
                                            </Text>
                                        </div>
                                        <div className="item-list-info-tutor">
                                            <div
                                                className="info-personal"
                                                style={{width: '100%', position: 'relative'}}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        color: '#1890FF'
                                                    }}
                                                >
                                                    Gia sư:&ensp;{item.nameTeacher}
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="man"/>
                                                    &ensp;Giới tính:&ensp;
                                                    <span style={{fontWeight: 500}}>{item.genderTeacher}</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="dollar"/>
                                                    &ensp;Giá thuê:&ensp;
                                                    <span style={{ fontWeight: 500 }}>
                                                        {numeral(item.moneyTeacherPerHour).format('0,0')} vnđ/h
													</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="euro"/>
                                                    &ensp;Tổng tiền hợp đồng:&ensp;
                                                    <span style={{ fontWeight: 500 }}>
                                                        {numeral(item.totalMoneyContract).format('0,0')} vnđ
													</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="phone"/>
                                                    &ensp;Số điện thoại:&ensp;
                                                    <span style={{fontWeight: 500}}>{item.phoneTeacher}</span>
                                                </Text>
                                                <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                                    <Icon type="home"/>
                                                    &ensp;Địa chỉ gia sư:&ensp;
                                                    <span style={{fontWeight: 500}}>
                                                        {item.addressTeacher}
												</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="book"/>&ensp;Môn dạy:{' '}
                                                    {item.teacherTopic.map(item => <Tag
                                                        style={{fontSize: 16}}>{item}</Tag>)}
                                                </Text>
                                                {item.noiDungKhieuNaiGV !== "" && item.noiDungKhieuNaiHS === "" && item.status === -2 && (
                                                    <Text style={{marginBottom: 5, textAlign: 'left', color: 'red'}}>
                                                        <Icon type="info-circle"/>
                                                        &ensp;Nội dung giáo viên đã khiếu nại bạn:&ensp;
                                                        <span style={{fontWeight: 500}}>
                                                            {item.noiDungKhieuNaiGV}
												</span>
                                                    </Text>
                                                )}
                                            </div>
                                        </div>
                                        <div className="item-list-info-hire">
                                            <Avatar
                                                size="large"
                                                style={{minHeight: 100, minWidth: 100, marginTop: 15, position:'absolute', left: 5}}
                                                src={item.imgStudent}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: '#1890FF',
                                                    marginBottom: 5,
                                                    marginTop: 10
                                                }}
                                            >
                                                Người thuê:&ensp;{item.nameStudent}
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="man"/>
                                                &ensp;Giới tính :&ensp;
                                                <span style={{fontWeight: 500}}>{dataStudent.gender}</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="phone"/>
                                                &ensp;Số điện thoại:&ensp;
                                                <span style={{fontWeight: 500}}>{dataStudent.phone}</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="book"/>&ensp;Môn thuê:{' '}
                                                {item.skills.map((item) => <Tag style={{fontSize: 16}}>{item}</Tag>)}
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
                                                <span style={{fontWeight: 500}}>{item.schedule.toString()}</span>
                                            </Text>
                                            <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                                <Icon type="home"/>
                                                &ensp;Địa chỉ học:&ensp;
                                                <span style={{fontWeight: 500}}>
													{item.address}, {item.wardName}, {item.districtName},{' '}
                                                    {item.provinceName}
												</span>
                                            </Text>
                                            {item.noiDungKhieuNaiHS !== "" && item.noiDungKhieuNaiGV === "" && item.status === -2 && (
                                                <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                                    <Icon type="info-circle"/>
                                                    &ensp;Nội dung bạn đã khiếu
                                                    nại <strong>{item.nameTeacher}</strong>:&ensp;
                                                    <span style={{fontWeight: 500}}>
													{item.noiDungKhieuNaiHS}
												</span>
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    title="Gửi khiếu nại"
                    visible={this.state.visibleReport}
                    onCancel={this.handleCancelReport}
                    onOk={event => {
                        fetch(`http://localhost:4000/contract/complaintFromStudent/${this.state.idContract}/${this.state.idStudent}/${this.state.name}`,
                            {method: 'PUT'})
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                this.err = 'Gửi khiếu nại thành công !';
                            })
                            .catch((error) => {
                                return error;
                            });
                    }}
                >
                    <b>{this.err}</b>
                    <Form layout="vertical" style={{textAlign: 'center'}}>
                        <Form.Item label="Nhập nội dung khiếu nại">
                            <TextArea
                                rows={3}
                                onChange={(event) => {
                                    this.setState({name: event.target.value});
                                }}
                                placeholder="Nội dung khiếu nại"
                                name="name"
                                autoFocus
                            />
                        </Form.Item>
                        <Form.Item>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyItems: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <b>{this.err}</b>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Gửi đánh giá của bạn"
                    visible={this.state.visibleHired}
                    onCancel={this.handleCancelHired}
                    onOk={event => {
                        fetch('http://localhost:4000/contract/addNewEvaluation', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                idContract: this.state.idContract,
                                point: valueRate,
                                titleEvaluation: this.state.titleEvaluation,
                                contentEvaluation: this.state.contentEvaluation,
                                idStudent: this.state.idStudent,
                                idTeacher: this.state.idTeacher,
                                nameStudent: this.state.nameStudent,
                                nameTeacher: this.state.nameTeacher,
                                imageStudent: this.state.imageStudent,
                                imageTeacher: this.state.imageTeacher,
                            })
                        }).then(value => value.json()).then(data => {
                            console.log(data);
                            this.err = 'Gửi đánh giá thành công !';
                        }).catch(error => {
                        });
                    }}
                >
                    <b>{this.err}</b>
                    <Form layout="vertical" style={{textAlign: 'center'}}>
                        <Form.Item label="Đánh giá của bạn về gia sư này ">
                            <Rate tooltips={desc} onChange={this.handleChangeRate} value={valueRate}/>
                            {valueRate ? <span className="ant-rate-text">{desc[valueRate - 1]}</span> : ''}
                        </Form.Item>
                        <Form.Item label="Tiêu đề đánh giá">
                            <Input
                                size="large"
                                placeholder="Tiêu đề đánh giá"
                                onChange={(event) => {
                                    this.setState({titleEvaluation: event.target.value});
                                }}
                                name="titleEvaluation"
                                autoFocus
                            />
                        </Form.Item>
                        <Form.Item label="Nội dung đánh giá">
                            <TextArea
                                rows={3}
                                placeholder="Nội dung đánh giá"
                                name="contentEvaluation"
                                onChange={(event) => {
                                    this.setState({contentEvaluation: event.target.value});
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyItems: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <b>{this.err}</b>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin,
    idStudent: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(OrderContract);
