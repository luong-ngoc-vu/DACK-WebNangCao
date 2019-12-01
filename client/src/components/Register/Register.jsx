import React from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './Register.css';
import { Form, Icon, Input, Button, Tooltip, Radio, Typography } from 'antd';

class RegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    typeUser: 1,
    autoCompleteResult: []
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="register-form">
        <Typography>
          <Typography.Title level={3}>Đăng ký tài khoản</Typography.Title>
          <div>
            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
              style={{ textAlign: 'center' }}
            >
              <Form.Item
                style={{
                  borderBottom: '1px solid #e0e0e0'
                }}
              >
                <Radio.Group
                  onChange={e => {
                    this.setState({ typeUser: e.target.value });
                  }}
                  value={this.state.typeUser}
                >
                  <Radio
                    value={1}
                    style={{ color: '#6290FF', margin: '10px 50px' }}
                  >
                    Thuê gia sư
                  </Radio>
                  <Radio
                    value={2}
                    style={{ color: '#6290FF', marginLeft: '20px' }}
                  >
                    Gia sư
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Họ tên đầy đủ">
                {getFieldDecorator('fullname', {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input size="large" placeholder="Họ tên đầy đủ của bạn" />)}
              </Form.Item>
              <Form.Item label="E-mail đăng nhập">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(
                  <Input
                    placeholder="Nhập email tài khoản đăng nhập"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Số điện thoại&nbsp;
                    <Tooltip title="Hãy cung cấp số điện thoại của bạn để nhận được sự phục vụ tốt nhất?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                      message: 'Xin nhập số điện thoại của bạn!',
                      whitespace: true
                    }
                  ]
                })(<Input size="large" placeholder="Số điện thoại liên lạc" />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password placeholder="Nhập mật khẩu" size="large" />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    placeholder="Nhập lại mật khẩu"
                    size="large"
                    onBlur={this.handleConfirmBlur}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="btn-sign-up"
                >
                  Đăng kí
                </Button>
                <div style={{ textAlign: 'center' }}>
                  <span>Bạn đã có tài khoản? </span>
                  <Link to="/login">Đăng nhập ngay!</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Typography>
      </div>
    );
  }
}

export const Register = Form.create({ name: 'normal_Register' })(RegisterForm);
