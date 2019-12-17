import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import {Form, Table} from 'antd';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Password',
        dataIndex: 'password',
    },
];

class ViewListAdminForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAdmin: [],
        };
    }

    componentDidMount() {
        fetch('https://apiadminwebsitethuegiasu.herokuapp.com/rootAdmin/getAllAdmin')
            .then(response => response.json())
            .then(data => this.setState({dataAdmin: data}));
    }

    render() {
        const {dataAdmin} = this.state;
        console.log(dataAdmin);
        const data = dataAdmin.map(row => ({
            email: row.email,
            password: row.password
        }));
        return (
            <div>
                <Table columns={columns} dataSource={data} size="default"/>
            </div>
        );
    }
}

const ViewListAdmin = Form.create({name: 'profile_form'})(ViewListAdminForm);
export default ViewListAdmin;
