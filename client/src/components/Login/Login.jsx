import React from 'react';
import { Route, Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox, Tabs, Typography } from 'antd';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class LoginForm extends React.Component {
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
                />
              )}
            </Form.Item>
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
              >
                Đăng nhập
              </Button>
              <span>Bạn chưa có tài khoản? </span>
              <Link to="/sign-up">Đăng ký ngay!</Link>
            </Form.Item>
          </Form>
          <div className="btn-social">
            <FacebookLogin
              appId="1088597931155576"
              fields="name,email,picture"
              cssClass="facebook-btn"
              icon="fa fa-facebook"
              textButton="Đăng nhập bằng Facebook"
            />
            <GoogleLogin
              className="google-btn"
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Đăng nhập bằng Google"
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </Typography>
      </div>
    );
  }
}

export const Login = Form.create({ name: 'normal_login' })(LoginForm);
