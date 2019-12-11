import React, { Component } from 'react';

import './Footer.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Icon, Form, Row, Col, Typography, Button } from 'antd';

const { Text } = Typography;
class Footer extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Row style={{ backgroundColor: '#1D4354' }}>
          <Col span={3}></Col>
          <Col span={18}>
            <Row style={{ backgroundColor: '#1D4354', padding: '10px 0px' }}>
              <Col
                span={15}
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    width: '100%'
                  }}
                >
                  <div
                    className="item-footer"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '10px'
                    }}
                  >
                    <Text
                      className="title-item-footer"
                      style={{ textAlign: 'center' }}
                    >
                      THỐNG KÊ
                    </Text>
                    <Row style={{ width: '100%' }}>
                      <Col span={8} style={{ textAlign: 'left' }}>
                        <Text className="data">
                          <span style={{ fontWeight: 500 }}> 750+</span>&ensp;
                          gia sư
                        </Text>
                      </Col>
                      <Col span={8} style={{ textAlign: 'left' }}>
                        <Text className="data">
                          {' '}
                          <span style={{ fontWeight: 500 }}> 7500+</span>&ensp;
                          người dùng
                        </Text>
                      </Col>
                      <Col span={8} style={{ textAlign: 'left' }}>
                        <Text className="data">
                          <span style={{ fontWeight: 500 }}> 750+</span>&ensp;
                          yêu cầu gia sư
                        </Text>
                      </Col>
                    </Row>
                  </div>
                  <Row
                    style={{
                      width: '100%',

                      alignItems: 'flex-start',
                      position: 'relative'
                    }}
                  >
                    <Col span={8} style={{ textAlign: 'left' }}>
                      <div className="item-footer">
                        <Text className="title-item-footer">BẠN ĐANG MUỐN</Text>
                        <Link style={{ color: 'white', marginBottom: 5 }}>
                          Thuê gia sư
                        </Link>
                        <Link style={{ color: 'white', marginBottom: 5 }}>
                          Trở thành gia sư
                        </Link>
                      </div>
                    </Col>
                    <Col span={8} style={{ textAlign: 'left' }}>
                      <div className="item-footer">
                        <Text className="title-item-footer">
                          DÀNH CHO GIA SƯ
                        </Text>
                        <Link style={{ color: 'white', marginBottom: 5 }}>
                          Chính sách phí
                        </Link>
                        <Link style={{ color: 'white', marginBottom: 5 }}>
                          Trở thành gia sư
                        </Link>
                        <Link
                          style={{
                            color: 'white',
                            textAlign: 'left',
                            marginBottom: 5
                          }}
                        >
                          Các điều khoản hoạt động
                        </Link>
                      </div>
                    </Col>
                    <Col span={8} style={{ textAlign: 'left' }}>
                      <div className="item-footer">
                        <Text className="title-item-footer">BMENTOR</Text>
                        <Link style={{ color: 'white', marginBottom: 5 }}>
                          Về chúng tôi
                        </Link>
                        <Link style={{ color: 'white', marginBottom: 5 }}>
                          Giấy phép hoạt động
                        </Link>
                        <Link
                          style={{
                            color: 'white',
                            textAlign: 'left',
                            marginBottom: 5
                          }}
                        >
                          Giải đáp thắc mắc
                        </Link>
                        <Link
                          style={{
                            color: 'white',
                            textAlign: 'left',
                            marginBottom: 5
                          }}
                        >
                          Hỗ trợ khiếu nại
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col span={9}>
                <div className="item-footer">
                  <Text className="title-item-footer">ĐỊA CHỈ TRỤ SỞ</Text>
                  <Text
                    style={{ fontSize: 15, color: 'white', textAlign: 'left' }}
                  >
                    <Icon type="home" />
                    &ensp;&ensp; Lầu 4, tòa nhà Sky Garden, quận 10, TP Hồ Chí
                    Minh
                  </Text>
                  <Text style={{ fontSize: 15, color: 'white' }}>
                    <Icon type="phone" />
                    &ensp;&ensp; 0222.123.456
                  </Text>
                  <Text style={{ fontSize: 15, color: 'white' }}>
                    <Icon type="mail" />
                    &ensp;&ensp; baongaymoi@gmail.com
                  </Text>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',

                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    position: 'relative'
                  }}
                >
                  <Text className="title-item-footer">Ý KIẾN ĐÓNG GÓP</Text>
                  <div style={{ padding: '0px 0px' }}>
                    <Button
                      style={{
                        backgroundColor: '#2691D9',
                        color: 'white',
                        fontSize: 14,
                        border: 0,
                        marginRight: 10
                      }}
                    >
                      <Icon type="mail"></Icon>
                      Gửi ý kiến
                    </Button>
                    <Text
                      style={{ marginRight: 10, color: 'white', fontSize: 15 }}
                    >
                      Hoặc liên hệ
                    </Text>
                    <Link to="#" style={{ fontSize: 15, color: '#1890FF' }}>
                      bmentor@gmail.com
                    </Link>
                  </div>
                  <Text style={{ color: 'white', fontSize: 15 }}>
                    Bmentor.com rất hoan nghênh các bạn đóng góp ý kiến cho
                    chúng tôi
                  </Text>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={3}></Col>
        </Row>
      </div>
    );
  }
}
export default Footer;
