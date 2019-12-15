import React, { Component } from 'react';

import 'antd/dist/antd.css';

import { List, Avatar, Icon, Button, Divider, Tag, Typography, Select } from 'antd';

import { Link } from 'react-router-dom';

const { Option } = Select;
const { Text } = Typography;
class OrderContract extends Component {

    render() {
        const listData = [];
    for (let i = 0; i < 23; i++) {
       listData.push({
       href: 'http://ant.design',
         name: `Bùi Tuấn Vũ`,
       address:'Đường 3/2, phường 14, quận 10, TP Hồ Chí Minh',
      position:`Sinh viên`,
      date: `20/12/2019`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      skills: ['Toán', 'Lý']
  });
}


        return (
          <div style={{ display: 'flex', flexDirection:'column', padding: '10px 0px'}}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: "column", padding: '0px 10px 10px 15px', borderBottom: '1px solid #e0e0e0'
              }}>
              <Text strong style={{  textAlign: 'left', fontSize: 20, marginBottom: 10 }}>Các yêu cầu chờ xác nhận</Text>
              <Select defaultValue="down" style={{ width: 150}} placeholder="Sắp xếp danh sách" >             
                <Option value="up">Ngày tăng dần</Option>
                <Option value="down">Ngày giảm dần</Option>
              </Select>
              </div>
                <List style={{minHeight: 350}}
                    size="large"
                    pagination={{
                      onChange: page => {
                        console.log(page);
                      },
                      pageSize: 3,
                    }}
                    className="demo-loadmore-list"
                     itemLayout="horizontal"
                    dataSource={listData}
              renderItem={item => (
                <List.Item
                         actions={[<Button icon="edit" type="primary" key="list-loadmore-edit" />,
                         <Button icon="close" type="danger" key="list-loadmore-edit" />]}>
                <List.Item.Meta
                   avatar={
                  <Avatar size="large" 
                     style={{ minHeight: 100, minWidth: 100 }}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        } 
                      title={
                        <div
                          style={{
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            borderBottom: '1px solid #e0e0e0',
                            padding: 10
                          }}>
                          <div className="info-personal"  style={{ width: '100%', position: 'relative' }}>
                              <div  style={{  marginBottom: 5, position:'relative' , width: '100%'}}>
                                 <Text style={{ fontSize: 20, position:'absolute', left:0, color:'#1890FF'}}>
                                {item.name}
                                 </Text>
                                 <Tag color="blue">Chờ xác nhận</Tag>
                                   <Text style={{position:'absolute', right:0}}>{item.date}</Text>
                                 </div>
                            <Text style={{ marginBottom: 5 }}>
                              <Icon type="idcard" theme="twoTone" />
                              &ensp;Mã số:&ensp;
                              <span style={{ fontWeight: 500 }}>102254</span>
                            </Text>  
                            <Text
                                style={{
                                  marginBottom: 5,
                                  float: 'left',
                                  textAlign: 'left'
                                }}
                              >
                                <Icon type="environment" theme="twoTone" />
                                &ensp;Địa chỉ:
                                <span style={{ fontWeight: 500 }}>&ensp; {item.address}</span>
                              </Text>
                              <Text style={{ marginBottom: 5 }}>
                                <Icon type="dollar" theme="twoTone" />
                                &ensp;Giá thuê:&ensp;
                                <span style={{ fontWeight: 500 }}>150,000 vnđ/h</span>
                              </Text>
                              
                                 
                              <div style={{display:'flex', flexDirection: 'row', width:'100%', margin:'5px 0px' }}>
                              <Text style={{marginRight: 10}}><Icon type="appstore" theme="twoTone" />&ensp;Chủ đề dạy: </Text>
                                {item.skills !== undefined && (
                                  <div>
                                    {item.skills.map(item => (
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
                    }
                    description={
                      <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', padding: 10}}>
                        <Text strong style={{fontSize: 18, marginBottom: 5}}>Thông tin thuê từ bạn</Text>
                        <Text strong style={{marginBottom: 5}}><Icon type="book" theme="twoTone" />&ensp;Môn bạn chọn: <Tag style={{fontSize: 16}}>Toán</Tag></Text>
                        <Text strong style={{marginBottom: 5}}><Icon type="clock-circle" theme="twoTone" />&ensp;Số giờ mỗi buổi: 2.5h/buổi</Text>
                        <Text strong style={{marginBottom: 5}}>
                                <Icon type="home" theme="twoTone" />
                                &ensp;Địa chỉ học:&ensp;
                                <span style={{ fontWeight: 500 }}>ĐƯờng Nam kỳ, phường Nam kỳ, quận 1, TP Hồ Chí Minh</span>
                        </Text>
                    </div>
                }
              />
              
            
          </List.Item>
        )}
      />
            </div>
        );
    }
}
export default OrderContract;
