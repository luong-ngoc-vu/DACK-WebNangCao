import React from 'react';
// import './CreateAdmin.css';
import 'antd/dist/antd.css';
import { Button, Form, Table, Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';

const { Title, Text } = Typography;

const columns = [
  {
    title: 'Tên kỹ năng',
    dataIndex: 'skillName'
  },
  {
    title: 'Thao tác sửa',
    dataIndex: 'actionEdit'
  },
  {
    title: 'Thao tác xóa',
    dataIndex: 'actionDelete'
  }
];

class ViewListSkillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSkill: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/admin/skills')
      .then(response => response.json())
      .then(data => this.setState({ dataSkill: data }));
  }

  render() {
    const st = this.props;
    if (st.isLogin === false) {
      return <Redirect to="/admin-login" />;
    }
    const { dataSkill } = this.state;
    const data = dataSkill.map(row => ({
      skillName: row.name,
      actionEdit: (
        <Link
          to="/admin-normal/detailSkill"
          size="large"
          onClick={event => {
            st.viewDetailSkill(row._id);
          }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Chỉnh sửa
        </Link>
      ),
      actionDelete: (
        <Button
          size="default"
          onClick={event => {
            st.deleteSkill(row._id);
          }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Xóa
        </Button>
      )
    }));
    return (
      <div>
        <Table columns={columns} dataSource={data} size="default" />
      </div>
    );
  }
}

const ViewListSkill = Form.create({ name: 'profile_form' })(ViewListSkillForm);
export default ViewListSkill;
