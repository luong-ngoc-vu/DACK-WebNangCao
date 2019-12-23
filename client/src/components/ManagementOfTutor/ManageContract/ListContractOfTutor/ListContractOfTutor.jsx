import React, {Component} from 'react';
import './ListContractOfTutor.css';
import 'antd/dist/antd.css';
import {Avatar, Button, Form, Icon, Input, List, Modal, Select, Tag, Typography} from 'antd';

const {Option} = Select;
const {Text} = Typography;

class OrderContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            visibleReport: false,
            idContract: '',
            idTeacher: '',
        };
    }

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

    render() {
        const {listData} = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', padding: '5px 0px'}}>
                <div className="filter-action">
                    <Select defaultValue="down" style={{width: 150}} placeholder="Sắp xếp danh sách">
                        <Option value="down">Ngày giảm dần</Option>
                        <Option value="up">Ngày tăng dần</Option>
                    </Select>
                </div>
                <List
                    style={{minHeight: 400, marginRight: 10}}
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
                        <List.Item
                            actions={
                                item.status === 0 ? (
                                    [
                                        <Button
                                            size="large"
                                            icon="check"
                                            type="primary"
                                            onClick={event => {
                                                const newStatus = 1;
                                                fetch(`http://localhost:4000/contract/changeStatus/${item.idContract}/${newStatus}`,
                                                    {method: 'PUT'})
                                                    .then((response) => response.json())
                                                    .then((data) =>
                                                        this.setState({
                                                            message: data.message
                                                        })
                                                    )
                                                    .catch((error) => {
                                                        return error;
                                                    });
                                            }}
                                        />,
                                        <Button
                                            size="large"
                                            icon="close"
                                            type="danger"
                                            key="2"
                                            onClick={event => {
                                                const newStatus = -1;
                                                fetch(`http://localhost:4000/contract/changeStatus/${item.idContract}/${newStatus}`,
                                                    {method: 'PUT'})
                                                    .then((response) => response.json())
                                                    .then((data) =>
                                                        this.setState({
                                                            message: data.message
                                                        })
                                                    )
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
                                            icon="warning"
                                            type="danger"
                                            onClick={event => {
                                                this.showModalReport();
                                                this.setState({idContract: item.idContract, idTeacher: item.idTeacher});
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
                                        style={{minHeight: 100, minWidth: 100}}
                                        src={item.imgTeacher}
                                    />
                                }
                                description={
                                    <div>
                                        <div className="item-list-info-tutor">
                                            <div
                                                className="info-personal"
                                                style={{width: '100%', position: 'relative'}}
                                            >
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#22A6F2',
                                                        marginBottom: '10px'
                                                    }}
                                                >
                                                    <Text style={{fontSize: 16, color: 'white'}}>
                                                        Mã hợp đồng: {item.idContract} - Tổng tiền hợp
                                                        đồng: {item.totalMoneyContract.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                    </Text>
                                                </div>
                                                <div style={{marginBottom: 5, position: 'relative', width: '100%'}}>
                                                    <Text
                                                        style={{
                                                            fontSize: 20,
                                                            position: 'absolute',
                                                            left: 0,
                                                            color: '#1890FF'
                                                        }}
                                                    >
                                                        {item.nameTeacher}
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
                                                    <Text style={{position: 'absolute', right: 0}}>{item.date}</Text>
                                                </div>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="idcard"/>
                                                    &ensp;Mã số:&ensp;
                                                    <span style={{fontWeight: 500}}>102254</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="dollar"/>
                                                    &ensp;Giá thuê:&ensp;
                                                    <span
                                                        style={{fontWeight: 500}}>
                                                        {item.moneyTeacherPerHour.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}/h</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="phone"/>
                                                    &ensp;Số điện thoại:&ensp;
                                                    <span
                                                        style={{fontWeight: 500}}>{item.phoneTeacher}</span>
                                                </Text>
                                                <Text style={{marginBottom: 5}}>
                                                    <Icon type="man"/>
                                                    &ensp;Giới tính:&ensp;
                                                    <span
                                                        style={{fontWeight: 500}}>{item.genderTeacher}</span>
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
                                                    <span
                                                        style={{fontWeight: 500}}>&ensp; {item.addressTeacher}</span>
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
                                                            {item.teacherTopic.map((item) => (
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
                                                {item.noiDungKhieuNaiGV !== "" && item.noiDungKhieuNaiHS === "" && item.status === -2 && (
                                                    <Text style={{marginBottom: 5, textAlign: 'left'}}>
                                                        <Icon type="info-circle"/>
                                                        &ensp;Nội dung bạn đã khiếu
                                                        nại <strong>{item.nameStudent}</strong>:&ensp;
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
                                                style={{minHeight: 100, minWidth: 100}}
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
                                                <Icon type="woman"/>
                                                &ensp;Giới tính :&ensp;
                                                <span style={{fontWeight: 500}}>Nữ</span>
                                            </Text>
                                            <Text style={{marginBottom: 5}}>
                                                <Icon type="phone"/>
                                                &ensp;Số điện thoại:&ensp;
                                                <span style={{fontWeight: 500}}>{item.phoneStudent}</span>
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
                        fetch(`http://localhost:4000/contract/complaintFromTeacher/${this.state.idContract}/${this.state.idTeacher}/${this.state.name}`,
                            {method: 'PUT'})
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                            })
                            .catch((error) => {
                                return error;
                            });
                        this.err = 'Gửi khiếu nại thành công !';
                    }}
                >
                    <Form layout="vertical" style={{textAlign: 'center'}}>
                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Nội dung khiếu nại"
                                onChange={(event) => {
                                    this.setState({name: event.target.value});
                                }}
                                name="name"
                                autoFocus
                            />
                        </Form.Item>
                        <b>{this.err}</b>
                        <Form.Item>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyItems: 'center',
                                    alignItems: 'center'
                                }}
                            >
                            </div>
                        </Form.Item>
                    </Form>
                    <b>{this.err}</b>
                </Modal>

            </div>
        );
    }
}

export default OrderContract;
