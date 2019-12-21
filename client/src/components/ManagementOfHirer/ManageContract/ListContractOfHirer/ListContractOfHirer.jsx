import React, { Component } from 'react';
import './ListContractOfHirer.css';
import 'antd/dist/antd.css';
import { Avatar, Button, Form, Icon, Input, List, Modal, Select, Tabs, Tag, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

class OrderContract extends Component {
  state = {
    visibleReport: false,
    visibleHired: false,
    idContract: '',
    idStudent: '',
    name: ''
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

  showModalHired = e => {
    this.setState({
      visibleHired: true
    });
  };

  handleOkHired = e => {
    //  api insert
  };

  handleCancelHired = e => {
    console.log(e);
    this.setState({
      visibleHired: false
    });
  };

  render() {
    const { listData } = this.props;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '5px 0px' }}>
        <div className="filter-action">
          <Select defaultValue="down" style={{ width: 150 }} placeholder="Sắp xếp danh sách">
            <Option value="up">Ngày tăng dần</Option>
            <Option value="down">Ngày giảm dần</Option>
          </Select>
        </div>
        <List
          style={{ minHeight: 400, marginRight: 15 }}
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
                  [null]
                ) : item.status === 1 ? (
                  [
                    <Button
                      size="large"
                      icon="check-circle"
                      type="primary"
                      onClick={this.showModalHired}
                    />,
                    <Button
                      size="large"
                      icon="warning"
                      type="danger"
                      onClick={event => {
                        this.showModalReport();
                        this.setState({ idContract: item.idContract, idStudent: item.idStudent });
                        const newStatus = -2;
                        fetch(`http://localhost:4000/contract/changeStatus/${item.idContract}/${newStatus}`,
                          { method: 'PUT' })
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
                    style={{ minHeight: 100, minWidth: 100, marginTop: 25 }}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
                        <Tag color="blue">Khiếu nại</Tag>
                      )}
                      <Text style={{ position: 'absolute', right: 0 }}>{item.dateContract}</Text>
                    </div>
                    <div className="item-list-info-tutor">
                      <div
                        className="info-personal"
                        style={{ width: '100%', position: 'relative' }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#1890FF'
                          }}
                        >
                          Gia sư:&ensp;{item.nameTeacher}
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                          <Icon type="dollar"/>
                          &ensp;Giá thuê:&ensp;
                          <span style={{ fontWeight: 500 }}>
														{item.moneyTeacherPerHour} vnđ/h
													</span>
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                          <Icon type="euro"/>
                          &ensp;Tổng tiền hợp đồng:&ensp;
                          <span style={{ fontWeight: 500 }}>
														{item.totalMoneyContract} vnđ
													</span>
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                          <Icon type="phone"/>
                          &ensp;Số điện thoại:&ensp;
                          <span style={{ fontWeight: 500 }}>0335 205 969</span>
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
                            style={{ fontWeight: 500 }}>&ensp;
                            {item.address}, {item.wardName}, {item.districtName},{' '}
                            {item.provinceName}
                                                    </span>
                        </Text>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginBottom: 10
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon type="appstore"/>&ensp;Chủ đề dạy:{' '}
                          </Text>
                          {item.skills !== undefined && (
                            <div>
                              {item.skills.map((item) => (
                                <Tag style={{ fontSize: 16 }}>{item}</Tag>
                              ))}
                            </div>
                          )}
                          {item.skills === null && (
                            <div>
                              <Tag style={{ fontSize: 16 }}>Chưa cập nhật</Tag>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="item-list-info-hire">
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
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="woman"/>
                        &ensp;Giới tính học viên:&ensp;
                        <span style={{ fontWeight: 500 }}>{item.genderStudent}</span>
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="phone"/>
                        &ensp;Số điện thoại:&ensp;
                        <span style={{ fontWeight: 500 }}>0335 205 969</span>
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="book"/>&ensp;Môn thuê:{' '}
                        {item.skills.map((item) => <Tag style={{ fontSize: 16 }}>{item}</Tag>)}
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="clock-circle"/>
                        &ensp;Số giờ mỗi buổi:&ensp;
                        <span style={{ fontWeight: 500 }}>{item.hourPerLesson} giờ/buổi</span>
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="table"/>
                        &ensp;Số buổi:&ensp;
                        <span style={{ fontWeight: 500 }}>{item.numberOfLesson} buổi</span>
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="team"/>
                        &ensp;Số người học:&ensp;
                        <span style={{ fontWeight: 500 }}>3</span>
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Icon type="schedule"/>
                        &ensp;Lịch học:&ensp;
                        <span style={{ fontWeight: 500 }}>{item.schedule.toString()}</span>
                      </Text>
                      <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        <Icon type="home"/>
                        &ensp;Địa chỉ học:&ensp;
                        <span style={{ fontWeight: 500 }}>
													{item.address}, {item.wardName}, {item.districtName},{' '}
                          {item.provinceName}
												</span>
                      </Text>
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
            fetch(`http://localhost:4000/contract/complaintStudent/${this.state.idContract}/${this.state.idStudent}/${this.state.name}`,
              { method: 'PUT' })
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
          <Form layout="vertical" style={{ textAlign: 'center' }}>
            <Form.Item label="Nhập nội dung khiếu nại">
              <Input
                size="large"
                placeholder="Nội dung khiếu nại"
                onChange={(event) => {
                  this.setState({ name: event.target.value });
                }}
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
          <b>{this.err}</b>
        </Modal>

        <Modal
          title="Hired Modal"
          visible={this.state.visibleHired}
          onOk={this.handleOkHired}
          onCancel={this.handleCancelHired}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default OrderContract;
