import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import {Link, Redirect} from 'react-router-dom';
import {Form, Table} from 'antd';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name'
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone'
    },
    {
        title: 'Thành phố',
        dataIndex: 'addressCity'
    },
    {
        title: 'Loại người dùng',
        dataIndex: 'typeUser'
    },
    {
        title: 'Thao tác',
        dataIndex: 'action'
    }
];

class ViewListUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: []
        };
    }

    componentDidMount() {
        fetch('https://apiadminwebsitethuegiasu.herokuapp.com/admin/users')
            .then(response => response.json())
            .then(data => this.setState({dataUser: data}));
    }

    render() {
        const st = this.props;
        if (st.isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }
        const {dataUser} = this.state;
        const data = dataUser.map(row => ({
            email: row.email,
            name: row.name,
            phone: row.phone,
            addressCity: row.addressCity,
            typeUser: row.typeUser,
            action: (
                <Link
                    to="/admin-normal/detailUser"
                    size="large"
                    onClick={event => {
                        st.viewDetailUser(row._id);
                    }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Xem chi tiết
                </Link>
            )
        }));
        return (
            <div>
                <Table columns={columns} dataSource={data} size="default"/>
            </div>
        );
    }
}

const ViewListUser = Form.create({name: 'profile_form'})(ViewListUserForm);
export default ViewListUser;
