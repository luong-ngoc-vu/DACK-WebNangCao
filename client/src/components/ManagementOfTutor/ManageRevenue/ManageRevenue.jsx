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

class ManageRevenue extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        allContracts: [],
        dataRevenueMonth: [],
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

        fetch(`http://localhost:4000/contract/thongKeDoanhThuByMonth/${idTeacher}`)
            .then((response) => response.json())
            .then((data) =>
                this.setState({dataRevenueMonth: data})
            )
            .catch((error) => {
                return error;
            });
    }

    render() {
        const {allContracts, dataRevenueMonth} = this.state;
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

        dataRevenueMonth.map(item => {
            revenueData.push({
                x: `Tháng ${item.month}`,
                y: item.revenue
            });
        });

        /*for (let i = 0; i < 12; i += 1) {
            revenueData.push({
                x: `Tháng ${i + 1}`,
                y: Math.floor(Math.random() * 1000) + 200
            });
        }*/
        return (
            <div style={{padding: '10px 20px'}}>
                <Bar height={200} title="Thống kê doanh thu của gia sư" data={revenueData}/>
                <div style={{width: 'auto', marginTop: 30}}>
                    <Text strong style={{fontSize: 18}}>
                        Danh sách hợp đồng
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
export default connect(mapStateToProps, null)(ManageRevenue);
