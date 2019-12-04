import React from 'react';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import { Card, Icon, Avatar, Row, Col, Tag, Button } from 'antd';
const { Meta } = Card;

class OutstandingTutorList extends React.Component {
  render() {
    return (
      <div className="out-tutor">
        <h2 style={{ textAlign: 'left', margin: '20px 0px' }}>
          Gia sư nổi bật
        </h2>
        <div className="out-tutor__list">
          <Row gutter={[24, 16]}>
            {' '}
            <Col span={6}>
              <Card
                hoverable="true"
                className="card-tutor"
                cover={
                  <img
                    style={{ width: '100%', height: 158, border: '0' }}
                    alt="example"
                    src="https://image.thanhnien.vn/660/uploaded/tuyenth/2019_08_05/f09fcb108d6019817a5c511744350e69d3c40682_rkcn.jpg"
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
                    Bùi Tuấn Vũ
                  </p>
                  <p>Địa chỉ: TP Hồ Chí Minh</p>
                  <p>
                    Học phí:{' '}
                    <span style={{ fontWeight: 'bolder' }}>140,000 vnđ</span>/h
                  </p>
                </div>
                <hr style={{ border: '1px solid #e0e0e0' }}></hr>
                <div>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Toán ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Lý ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold', marginTop: 5 }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Hóa ôn thi ĐH
                    </a>
                  </Tag>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable="true"
                className="card-tutor"
                cover={
                  <img
                    style={{ width: '100%', height: 158, border: '0' }}
                    alt="example"
                    src="https://image.thanhnien.vn/660/uploaded/tuyenth/2019_08_05/f09fcb108d6019817a5c511744350e69d3c40682_rkcn.jpg"
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
                    Bùi Tuấn Vũ
                  </p>
                  <p>Địa chỉ: TP Hồ Chí Minh</p>
                  <p>
                    Học phí:{' '}
                    <span style={{ fontWeight: 'bolder' }}>140,000 vnđ</span>/h
                  </p>
                </div>
                <hr style={{ border: '1px solid #e0e0e0' }}></hr>
                <div>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Toán ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Lý ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold', marginTop: 5 }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Hóa ôn thi ĐH
                    </a>
                  </Tag>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable="true"
                className="card-tutor"
                cover={
                  <img
                    style={{ width: '100%', height: 158, border: '0' }}
                    alt="example"
                    src="https://image.thanhnien.vn/660/uploaded/tuyenth/2019_08_05/f09fcb108d6019817a5c511744350e69d3c40682_rkcn.jpg"
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
                    Bùi Tuấn Vũ
                  </p>
                  <p>Địa chỉ: TP Hồ Chí Minh</p>
                  <p>
                    Học phí:{' '}
                    <span style={{ fontWeight: 'bolder' }}>140,000 vnđ</span>/h
                  </p>
                </div>
                <hr style={{ border: '1px solid #e0e0e0' }}></hr>
                <div>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Toán ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Lý ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold', marginTop: 5 }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Hóa ôn thi ĐH
                    </a>
                  </Tag>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable="true"
                className="card-tutor"
                cover={
                  <img
                    style={{ width: '100%', height: 158, border: '0' }}
                    alt="example"
                    src="https://image.thanhnien.vn/660/uploaded/tuyenth/2019_08_05/f09fcb108d6019817a5c511744350e69d3c40682_rkcn.jpg"
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
                    Bùi Tuấn Vũ
                  </p>
                  <p>Địa chỉ: TP Hồ Chí Minh</p>
                  <p>
                    Học phí:{' '}
                    <span style={{ fontWeight: 'bolder' }}>140,000 vnđ</span>/h
                  </p>
                </div>
                <hr style={{ border: '1px solid #e0e0e0' }}></hr>
                <div>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Toán ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold' }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Lý ôn thi ĐH
                    </a>
                  </Tag>
                  <Tag style={{ fontWeight: 'bold', marginTop: 5 }}>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Hóa ôn thi ĐH
                    </a>
                  </Tag>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default OutstandingTutorList;
