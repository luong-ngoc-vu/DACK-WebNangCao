import React, {Component} from 'react';

import 'antd/dist/antd.css';
import {Bar} from 'ant-design-pro/lib/Charts';

import {Redirect} from 'react-router-dom';
import {Input, Select, Table, Typography} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';

const {Title, Text} = Typography;
const {Option} = Select;
const {Search} = Input;

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

class StatisticAndRevenue extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        allContracts: [],
        contractsByStatus: []
    };

    componentDidMount() {
        fetch(`http://localhost:4000/contract/contractByStatus/${2}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({contractsByStatus: data});
            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        const {contractsByStatus} = this.state;
        const {isLogin} = this.props;
        const dataContracts = contractsByStatus.map((item) => ({
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
                <Bar height={200} title="Thống kê doanh thu của gia sư" data={revenueData}/>
                <div style={{width: 'auto', marginTop: 30}}>
                    <Text strong style={{fontSize: 18}}>
                        Danh sách hợp đồng đã hoàn thành
                    </Text>
                    <div style={{float: 'right'}}/>
                </div>
                <Table columns={columns} dataSource={dataContracts}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin,
    nameTeacher: state.LoginReducer.name,
    idTeacher: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(StatisticAndRevenue);
