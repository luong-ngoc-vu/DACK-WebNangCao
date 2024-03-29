import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Button, Form, Input, Layout, Typography } from 'antd';
import Redirect from 'react-router-dom/Redirect';
import '../ManagementOfHirer/ProfileHirer/ProfileHirer.css';

const { Content } = Layout;
const { Title } = Typography;

class ChangePasswordForm extends React.Component {
  constructor() {
    super();
    this.password = '';
    this.newpassword = '';
    this.err = '';
  }

  state = {
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const st = this.props;
    if (st.isRightPassword === 'err') {
      this.err = 'Mật khẩu cũ không chính xác !';
    }
    if (!st.isLogin) {
      return <Redirect to="/login"/>;
    }
    return (
      <div>
        <Content
          style={{
            padding: '0 0px',
            minHeight: 280,
            background: '#fff',

            boxShadow: '0px 1px 6px 0px rgba(57, 73, 76, 0.35)'
          }}
        >
          <Typography className="typo-data">
            <div>
              <Title level={4}>Thay đổi mật khẩu</Title>
              <br/>
              <Avatar size={150} src={st.image}/>
              <Form
                style={{ padding: '0px 50px' }}
                layout="vertical"
                onSubmit={this.handleSubmit}
              >
                <Form.Item label="Mật khẩu hiện tại">
                  <Input.Password
                    size="large"
                    placeholder="Nhập mật khẩu hiện tại"
                    autoFocus
                    name="password"
                    onChange={event => {
                      this.password = event.target.value;
                    }}
                  />
                </Form.Item>
                <Form.Item label="Mật khẩu mới">
                  <Input.Password
                    size="large"
                    placeholder="Nhập mật khẩu mới"
                    name="newpassword"
                    onChange={event => {
                      this.newpassword = event.target.value;
                    }}
                  />
                </Form.Item>
                <div>{this.err}</div>
                <Form.Item>
                  <Button
                    style={{ width: '150px', margin: '10px 300px' }}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="btn-sign-up"
                    onClick={event => {
                      event.preventDefault();
                      if (this.password !== '' && this.newpassword !== '')
                        st.changePass(
                          st.email,
                          this.password,
                          this.newpassword
                        );
                      this.err = 'Cập nhật mật khẩu thành công !';
                    }}
                  >
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Typography>
        </Content>
      </div>
    );
  }
}

const ChangePassword = Form.create({ name: 'profile_form' })(
  ChangePasswordForm
);
export default ChangePassword;
