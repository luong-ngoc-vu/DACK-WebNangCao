import React from 'react';
import {Link} from 'react-router-dom';
import './OutstandingTutorList.css';
import 'antd/dist/antd.css';

import {Button, Card, Col, Rate, Row, Tag} from 'antd';

class OutstandingTutorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTutorialBySkill: [],
        };
    }

    componentDidMount() {
        const st = this.props;
    }

    render() {
        const st = this.props;
        fetch(`https://apiclientwebsitethuegiasu.herokuapp.com/user/getTeacherBySkillName/${st.subSkillName}`)
            .then(response => response.json())
            .then(data => this.setState({dataTutorialBySkill: data}));
        const {dataTutorialBySkill} = this.state;
        return (
            <div className="out-tutor">
                <div className="filter-tutor">
                    <h2 style={{textAlign: 'left', margin: '20px 0px'}}>
                        Gia sư dạy <strong>{st.subSkillName}</strong>
                    </h2>
                </div>
                <div className="out-tutor__list">
                    <Row gutter={[24, 16]}>
                        {' '}
                        {dataTutorialBySkill.map(teacher => (
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
                                                <Rate disabled defaultValue={teacher.averagePoint}/>
                                            </p>
                                            <p>Địa chỉ: {teacher.provinceName}</p>
                                            <p>
                                                Học phí:{' '}
                                                <span style={{fontWeight: 'bolder'}}>
                                                    {teacher.money.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </span>/buổi
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
