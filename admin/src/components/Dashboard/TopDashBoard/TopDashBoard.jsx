import React, {Component} from 'react';
import '../DashBoard.css';
import 'antd/dist/antd.css';
import {ChartCard, Field, MiniArea, MiniBar, MiniProgress, yuan} from 'ant-design-pro/lib/Charts';

import {Redirect} from 'react-router-dom';
import {Col, Icon, Row, Tooltip} from 'antd';
import Trend from 'ant-design-pro/lib/Trend';
import numeral from 'numeral';
import moment from 'moment';
import {connect} from 'react-redux';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10
    });
}
const columns = [
    {
        title: 'Mã hợp đồng',
        dataIndex: 'idContract',
        key: 'idContract'
    },
    {
        title: 'Tên gia sư',
        dataIndex: 'tutorName',
        key: 'tutorName'
    },
    {
        title: 'Tên người thuê',
        dataIndex: 'hirerName',
        key: 'hirerName'
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'dateContract',
        key: 'dateContract'
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'dateContractEnd',
        key: 'dateContractEnd'
    },
    {
        title: 'Khoản thanh toán',
        dataIndex: 'totalMoneyContract',
        key: 'totalMoneyContract'
    }
];

class TopDashBoard extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        allContracts: [],
        topThreeTutorialHighestRevenue: [],
        contractsByStatus: []
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
        const {allContracts} = this.state;
        const {isLogin} = this.props;
        const dataContracts = allContracts.map((item) => ({
            idContract: item.idContract,
            tutorName: item.nameTeacher,
            hirerName: item.nameStudent,
            dateContract: moment(item.dateContract).format('DD/MM/YYYY'),
            dateContractEnd: moment(item.dateContractEnd).format('DD/MM/YYYY'),
            totalMoneyContract: item.totalMoneyContract.toLocaleString('vi', {style: 'currency', currency: 'VND'}),
            cost: item.totalMoneyContract
        }));

        const revenueData = [];
        if (isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }

        for (let i = 0; i < 12; i += 1) {
            revenueData.push({
                x: `Tháng ${i + 1}`,
                y: Math.floor(Math.random() * 1000) + 200
            });
        }
        return (
            <div style={{padding: '10px 20px'}}>
                <Row>
                    <Col span={6} className="card-show-data">
                        <ChartCard
                            title="Doanh thu trong ngày"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={() => <span dangerouslySetInnerHTML={{__html: yuan(126560)}}/>}
                            footer={<Field label="日均销售额" value={numeral(12423).format('0,0')}/>}
                            contentHeight={60}
                        >
							<span>
								周同比
								<Trend flag="up" style={{marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>
									12%
								</Trend>
							</span>
                            <span style={{marginLeft: 16}}>
								日环比
								<Trend flag="down" style={{marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>
									11%
								</Trend>
							</span>
                        </ChartCard>
                    </Col>
                    <Col span={6} className="card-show-data">
                        <ChartCard
                            title="Số lượng người truy cập"
                            total={numeral(8860).format('0,0')}
                            contentHeight={60}
                            footer={<Field label="Số hợp đồng hôm nay" value={numeral(1234).format('0,0')}/>}
                        >
                            <MiniArea line height={45} data={visitData}/>
                        </ChartCard>
                    </Col>
                    <Col span={6} className="card-show-data">
                        <ChartCard
                            title="Số hợp đồng trong tuần"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(8860).format('0,0')}
                            footer={<Field label="Số hợp đồng hôm nay" value={numeral(1234).format('0,0')}/>}
                            contentHeight={60}
                        >
                            <MiniBar height={60} data={visitData}/>
                        </ChartCard>
                    </Col>
                    <Col span={6} className="card-show-data">
                        <ChartCard
                            title="线上购物转化率"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total="78%"
                            footer={
                                <div>
									<span>
										周同比
										<Trend flag="up" style={{marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>
											12%
										</Trend>
									</span>
                                    <span style={{marginLeft: 16}}>
										日环比
										<Trend flag="down" style={{marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>
											11%
										</Trend>
									</span>
                                </div>
                            }
                            contentHeight={60}
                        >
                            <MiniProgress percent={78} strokeWidth={8} target={80}/>
                        </ChartCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin,
    nameTeacher: state.LoginReducer.name,
    idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(TopDashBoard);
