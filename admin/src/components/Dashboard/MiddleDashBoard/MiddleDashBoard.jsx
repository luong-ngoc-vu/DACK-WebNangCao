import React, {Component} from 'react';
import '../DashBoard.css';
import 'antd/dist/antd.css';
import {Bar} from 'ant-design-pro/lib/Charts';

import {Redirect} from 'react-router-dom';
import {Avatar, Col, Input, Row, Select, Tabs, Typography} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';

const {Title, Text} = Typography;
const {Option} = Select;
const {Search} = Input;
const {TabPane} = Tabs;

const topTutor = [
    {
        x: 'Tiếng anh giao tiếp',
        y: 40800000,
        z: 'teacher10@gmail.com'
    },
    {
        x: 'Tiếng anh thi TOEIC',
        y: 37500000,
        z: 'teacher9@gmail.com'
    },
    {
        x: 'Hóa lớp 11',
        y: 30000000,
        z: 'teacher7@gmail.com'
    },
    {
        x: 'Lý thi THPT',
        y: 22600000,
        z: 'teacher6@gmail.com'
    },
    {
        x: 'Lý thi cấp 3',
        y: 16000000,
        z: 'teacher1@gmail.com'
    }
];

class MiddleDashBoard extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        allContracts: [],
        contractsByStatus: [],
        topThreeTutorialHighestRevenue: [],
    };

    componentDidMount() {
        const {idTeacher} = this.props;

        fetch(`http://localhost:4000/contract/getListContractByIdTeacher/${idTeacher}`)
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    allContracts: data.filter((item) => item.status === 2)
                })
            )
            .catch((error) => {
                return error;
            });

        fetch(`http://localhost:4000/contract/getListTutorAndRevenue`)
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    topThreeTutorialHighestRevenue: data
                })
            )
            .catch((error) => {
                return error;
            });
    }

    render() {
        const {allContracts, topThreeTutorialHighestRevenue} = this.state;

        const topTutorFromDB = topThreeTutorialHighestRevenue.map((item) => ({
            x: item._id.nameTeacher,
            y: item.revenue,
            imageTeacher: item._id.imageTeacher
        }));

        const {isLogin} = this.props;
        if (isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }
        const dataContracts = allContracts.map((item) => ({
            idContract: item.idContract,
            tutorName: item.nameTeacher,
            hirerName: item.nameStudent,
            dateContract: moment(item.dateContract).format('DD/MM/YYYY'),
            dateContractEnd: moment(item.dateContractEnd).format('DD/MM/YYYY'),
            totalMoneyContract: item.totalMoneyContract.toLocaleString('vi', {style: 'currency', currency: 'VND'}),
            cost: item.totalMoneyContract
        }));

        return (
            <div style={{padding: '10px 20px'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Top gia sư theo doanh thu" key="1">
                        <Row gutter={20}>
                            <Col span={16}>
                                <Bar height={400} title="Thống kê doanh thu của gia sư" data={topTutorFromDB}/>
                            </Col>
                            <Col span={8}>
                                <div style={{width: '100%'}}>
                                    <h4>
                                        <span>Top gia sư có doanh thu cao nhất</span>
                                    </h4>
                                    <ol
                                        style={{
                                            listStyleType: 'none',
                                            margin: 20,
                                            padding: 0
                                        }}
                                    >
                                        {topTutorFromDB.map((item, index) => (
                                            <li
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    position: 'relative',
                                                    marginBottom: 10
                                                }}
                                            >
                                                <div className="ranking ${}">
                                                    <Text className={`text-ranking top-${index + 1}`}>{index + 1}</Text>
                                                </div>
                                                <Avatar
                                                    style={{marginRight: 5}}
                                                    size="large"
                                                    src={item.imageTeacher}
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start'
                                                    }}
                                                >
                                                    <span style={{color: 'blue'}}>{item.x}</span>
                                                </div>
                                                <span style={{float: 'right', position: 'absolute', right: 0}}>
													{item.y.toLocaleString('vi', {style: 'currency', currency: 'VND'})}
												</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Top chuyên mục theo doanh thu" key="2">
                        <Row gutter={20}>
                            <Col span={16}>
                                <Bar height={400} title="Thống kê doanh thu của gia sư" data={topTutor}/>
                            </Col>
                            <Col span={8}>
                                <div style={{width: '100%'}}>
                                    <h4>
                                        <span>Top kỹ năng doanh thu cao nhất</span>
                                    </h4>
                                    <ol
                                        style={{
                                            listStyleType: 'none',
                                            margin: 20,
                                            padding: 0
                                        }}
                                    >
                                        {topTutor.map((item, index) => (
                                            <li
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    position: 'relative',
                                                    marginBottom: 10
                                                }}
                                            >
                                                <div className="ranking ${}">
                                                    <Text className={`text-ranking top-${index + 1}`}>{index + 1}</Text>
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start'
                                                    }}
                                                >
                                                    <span style={{color: 'blue'}}>{item.x}</span>
                                                </div>
                                                <span style={{float: 'right', position: 'absolute', right: 0}}>
													{item.y.toLocaleString('vi', {style: 'currency', currency: 'VND'})}
												</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin,
    nameTeacher: state.LoginReducer.name,
    idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(MiddleDashBoard);
