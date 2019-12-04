import React from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';

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
          <Typography.Title
            level={3}
            style={{
              color: 'hsl(209, 100%, 55%)',
              textAlign: 'center',
              marginBottom: 20
            }}
          >
            BMENTOR ADMIN
          </Typography.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền tài khoản để đăng nhập!'
                  }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Nhập username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng điền password!' }]
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
                style={{ width: 'auto' }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Typography>
      </div>
    );
  }
}

export const Login = Form.create({ name: 'normal_login' })(LoginForm);
