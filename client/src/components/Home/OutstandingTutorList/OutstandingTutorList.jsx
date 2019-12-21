import React from 'react';
import {Link} from 'react-router-dom';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import {Button, Card, Col, Form, Row, Select, Tag} from 'antd';
import {getProvinces} from "sub-vn";

class OutstandingTutorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTutorialCity: [],
            provinceName: '',
            checkChooseCity: false,
        };
    }

    componentDidMount() {
        fetch('http://localhost:4000/user/getTutorialUser')
            .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    render() {
        const st = this.props;
        let data_tutorial = [];
        const {data, dataTutorialCity} = this.state;
        if (this.state.checkChooseCity === false)
            data_tutorial = data;
        else if (this.state.checkChooseCity === true)
            data_tutorial = dataTutorialCity;
        return (
            <div className="out-tutor">
                <div className="filter-tutor">
                    <h2 style={{textAlign: 'left', margin: '20px 0px'}}>
                        <strong>Gia sư nổi bật</strong>
                    </h2>
                    <Form.Item label="Chọn tỉnh/ Thành phố">
                        <Select
                            labelInValue
                            onChange={value => {
                                fetch(`http://localhost:4000/user/getTutorialCity/${value.label}`)
                                    .then((response) => response.json())
                                    .then((teachers) => {
                                        this.setState({
                                            dataTutorialCity: teachers,
                                            provinceCode: value.key,
                                            provinceName: value.label,
                                            checkChooseCity: true
                                        });
                                    })
                                    .catch((error) => {
                                        return error;
                                    });
                            }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            size="large"
                            style={{width: '100%'}}
                        >
                            {getProvinces().map(con => (
                                <Select.Option value={con.code}>{con.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="out-tutor__list">
                    <Row gutter={[24, 16]}>
                        {' '}
                        {data_tutorial.map(teacher => (
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
                                            <p>Địa chỉ: {teacher.provinceName}</p>
                                            <p>
                                                Học phí:{' '}
                                                <span style={{fontWeight: 'bolder'}}>
                                                    {teacher.money} VNĐ</span>/h
                                            </p>
                                        </div>
                                        <hr style={{border: '1px solid #e0e0e0'}}></hr>
                                        <div>
                                            {teacher.skills.map(skill => (
                                                <Tag style={{fontWeight: 'bold'}}>{skill}</Tag>
                                            ))}
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
