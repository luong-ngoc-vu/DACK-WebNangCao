import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import {Link, Redirect} from 'react-router-dom';
import {Button, Form, Input, Select, Table, Typography} from 'antd';

const {Title, Text} = Typography;
const {Option} = Select;
const {Search} = Input;
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
        dataIndex: 'provinceName'
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
            nameSearch: '',
            dataUser: [],
            dataUserTeacher: [],
            dataUserStudent: [],
            dataUserSearch: [],
            isLocked: false,
            selectedTypeUser: 'all'
        };
    }

    componentDidMount() {
        fetch('http://localhost:4000/admin/users')
            .then(response => response.json())
            .then(data => this.setState({dataUser: data}));
        fetch('http://localhost:4000/admin/teachers')
            .then(response => response.json())
            .then(data => this.setState({dataUserTeacher: data}));
        fetch('http://localhost:4000/admin/students')
            .then(response => response.json())
            .then(data => this.setState({dataUserStudent: data}));
    }

    render() {
        const st = this.props;
        if (st.isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }
        const {dataUser, dataUserTeacher, dataUserStudent, dataUserSearch} = this.state;

        let data_user = [];
        if (this.state.selectedTypeUser === "all")
            data_user = dataUser;
        else if (this.state.selectedTypeUser === "hirer")
            data_user = dataUserStudent;
        else if (this.state.selectedTypeUser === "tutor")
            data_user = dataUserTeacher;
        else if (this.state.searchName !== " " && this.state.selectedTypeUser === '') {
            data_user = dataUserSearch;
        }
        const data = data_user.map(row => ({
            email: row.email,
            name: row.name,
            phone: row.phone,
            provinceName: row.provinceName === undefined ? 'Chưa cập nhật' : row.provinceName,
            typeUser: row.typeUser === 1 ? 'Người thuê' : 'Gia sư',
            action: (
                <span style={{display: 'flex', flexDirection: 'row'}}>
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
            <Button type="primary" icon="eye"/>
          </Link>

          <Link
              size="large"
              onClick={event => {
                  st.lockUser(row.email);
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
          >
              {row.isLocked === false && (
                  <Button type="ghost" icon="unlock"/>
              )}
              {row.isLocked === true && (
                  <Button type="danger" icon="lock"/>
              )}
          </Link>
        </span>
            )
        }));
        return (
            <div>
                <div style={{width: '100%', padding: '5px 10px'}}>
                    <Text style={{fontSize: '20px'}}>Danh sách người dùng</Text>
                    <div
                        style={{float: 'right', display: 'flex', flexDirection: 'row'}}
                    >
                        <Select
                            defaultValue="all"
                            showSearch
                            onChange={value => {
                                this.setState({selectedTypeUser: value})
                            }}
                            style={{width: 200}}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="all">Loại user - Tất cả</Option>
                            <Option value="hirer">Loại user - Người thuê</Option>
                            <Option value="tutor">Loại user - Gia sư</Option>
                        </Select>
                        <Search
                            enterButton
                            placeholder="Tìm người dùng theo tên"
                            onSearch={value => {
                                fetch('http://localhost:4000/admin/getUserByName', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({name: value})
                                }).then(value => value.json()).then(teachers => {
                                    console.log(teachers);
                                    this.setState({dataUserSearch: teachers, searchName: value, selectedTypeUser: ''});
                                }).catch(error => {
                                });
                            }}
                            style={{width: 250, margin: '0px 10px'}}
                        />
                    </div>
                </div>
                <Table columns={columns} dataSource={data} size="default"/>
            </div>
        );
    }
}

const ViewListUser = Form.create({name: 'profile_form'})(ViewListUserForm);
export default ViewListUser;
