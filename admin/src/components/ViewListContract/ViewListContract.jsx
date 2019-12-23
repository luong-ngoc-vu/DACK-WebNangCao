import React from 'react';
import {connect} from 'react-redux';

import 'antd/dist/antd.css';
import {Link, Redirect} from 'react-router-dom';
import {Button, Input, Select, Table, Tag, Typography} from 'antd';
import {viewContractRequest} from "../ViewListUsers/ViewListUserAction";

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

class ViewListContract extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        selectedStatusContract: 3,
        allContracts: [],
        contractsByStatus: [],
    };

    componentDidMount() {
        fetch(`http://localhost:4000/contract/contracts`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({allContracts: data});
            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        let contract_data;
        const {viewContract, isLogin} = this.props;
        if (isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }

        let {allContracts, contractsByStatus, selectedStatusContract} = this.state;

        if (selectedStatusContract !== 3) {
            contract_data = contractsByStatus;
        } else
            contract_data = allContracts;

        const listContract = contract_data.map((item) => ({
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
                    <Tag color="yellow">Khiếu nại</Tag>
                ),
            cost: item.totalMoneyContract,
            action: (
                <span style={{display: 'flex', flexDirection: 'row'}}>
					<Link
                        to={"/admin-normal/detailContract/" + (item.idContract)}
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
                    <div style={{float: 'right'}}>
                        {' '}
                        <Select
                            defaultValue="Tất cả hợp đống"
                            showSearch
                            onChange={value => {
                                fetch(`http://localhost:4000/contract/contractByStatus/${value}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        this.setState({contractsByStatus: data, selectedStatusContract: value});
                                    })
                                    .catch((error) => {
                                        return error;
                                    });
                            }}
                            style={{width: 200}}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value={3}>Tất cả hợp đồng</Option>
                            <Option value={0}>Chờ xác nhận</Option>
                            <Option value={-1}>Bị từ chối</Option>
                            <Option value={-2}>Khiếu nại</Option>
                            <Option value={1}>Đang thuê</Option>
                            <Option value={2}>Đã kết thức</Option>
                        </Select>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewListContract);
