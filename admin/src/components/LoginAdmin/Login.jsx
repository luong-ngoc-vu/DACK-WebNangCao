import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.typeUser = 1;
    this.err = '';
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const st = this.props;
    if (st.token === 'err') {
      this.err = 'Email hoặc mật khẩu không chính xác !';
    }
    if (st.isLogin === true && st.typeUser === 'rootAdmin') {
      return <Redirect to="/hirer-manage/profile" />;
    } else if (st.isLogin === true && st.typeUser === 'admin') {
      return <Redirect to="/tutor-manage/profile" />;
    }

    return (
      <div className="login-form">
        <Typography>
          <Typography.Title level={3} style={{ marginBottom: '20px' }}>
            Đăng nhập
          </Typography.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Xin điền tài khoản để đăng nhập!'
                  }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Nhập tài khoản email"
                  onChange={event => {
                    this.email = event.target.value;
                  }}
                  name="email"
                  autoFocus
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Xin điền mật khẩu của bạn!' }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={event => {
                    this.password = event.target.value;
                  }}
                  name="password"
                />
              )}
            </Form.Item>
            <div>{this.err}</div>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox style={{ float: 'left' }}>Remember me</Checkbox>)}
              <Link className="login-form-forgot" to="/forgot-pass">
                Quên mật khẩu?
              </Link>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={event => {
                  event.preventDefault();
                  if (this.name !== '' && this.password !== '')
                    st.Login(this.email, this.password);
                }}
              >
                Đăng nhập
              </Button>
              <span>Bạn chưa có tài khoản? </span>
              <Link to="/register">Đăng ký ngay!</Link>
            </Form.Item>
          </Form>
        </Typography>
      </div>
    );
  }
}

export const Login = Form.create({ name: 'normal_login' })(LoginForm);
