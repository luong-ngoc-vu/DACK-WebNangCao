import React from 'react';

import 'antd/dist/antd.css';
import {Link, Redirect} from 'react-router-dom';
import {Button, Input, Select, Table, Tag, Typography} from 'antd';
import {viewContractRequest} from "../ViewListUsers/ViewListUserAction";
import {connect} from "react-redux";

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
        title: 'Ngày tạo',
        dataIndex: 'dateContract',
        key: 'dateContract'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Khoản thanh toán',
        dataIndex: 'totalMoneyContract',
        key: 'totalMoneyContract'
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action'
    }
];

class ViewListComplaint extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        complaintContracts: []
    };

    componentDidMount() {
        fetch(`http://localhost:4000/contract/contractByStatus/${-2}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({complaintContracts: data});
            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        let {complaintContracts} = this.state;
        const {viewContract, isLogin} = this.props;
        if (isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }

        const listContract = complaintContracts.map((item) => ({
            idContract: item.idContract,
            tutorName: item.nameTeacher,
            hirerName: item.nameStudent,
            dateContract: item.dateContract,
            totalMoneyContract: item.totalMoneyContract + ' VNĐ',
            status:
                item.status === 0 ? (
                    <Tag color="blue">Chờ xác nhận</Tag>
                ) : item.status === 1 ? (
                    <Tag color="green">Đang thuê</Tag>
                ) : item.status === 2 ? (
                    <Tag color="orange">Đã kết thúc</Tag>
                ) : item.status === -1 ? (
                    <Tag color="red">Bị từ chối</Tag>
                ) : (
                    <Tag color="orange">Khiếu nại</Tag>
                ),
            cost: item.totalMoneyContract,
            action: (
                <span style={{display: 'flex', flexDirection: 'row'}}>
					<Link
                        to="/admin-normal/detailContract"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={event => {
                            viewContract(item.idContract, item.idStudent, item.idTeacher);
                        }}
                    >
						<Button type="primary" icon="eye"/>
					</Link>

					<Link to="#" size="large" type="primary" htmlType="submit" className="login-form-button">
						<Button type="danger" icon="stop"/>
					</Link>
				</span>
            )
        }));
        return (
            <div>
                <div style={{width: 'auto', margin: '5px 5px'}}>
                    <Text strong style={{fontSize: 20}}>
                        Danh sách hợp đồng
                    </Text>
                </div>
                <Table columns={columns} dataSource={listContract} onChange={this.handleChange}/>
            </div>
        );
    }
}

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin,
        isLocked: st.ViewDetailUserReducer.isLocked
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewContract: (idContract, idStudent, idTeacher) => {
            dispatch(viewContractRequest(idContract, idStudent, idTeacher));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListComplaint);
