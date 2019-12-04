import React from 'react';
import './CreateAdmin.css';
import 'antd/dist/antd.css';

import Redirect from 'react-router-dom/Redirect';
import { Button, Form, Input, Typography } from 'antd';

const { Title, Text } = Typography;

class CreateAdminForm extends React.Component {
  constructor() {
    super();
    this.name = '';
    this.email = '';
    this.phone = '';
    this.image = '';
    this.address = '';
    this.moreInfo = '';
    this.err = '';
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Hai mật khẩu không trùng khớp!');
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
    const st = this.props;

    this.name = st.name;
    this.email = st.email;
    this.phone = st.phone;
    this.image = st.image;
    this.address = st.address;
    this.moreInfo = st.moreInfo;

    if (st.isLogin === false) {
      return <Redirect to="/login" />;
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Typography className="typo-data">
          <div>
            <Form
              style={{
                margin: '0px 400px',
                padding: '10px 20px',
                boxShadow: ' hsla(180, 9%, 6%, 0.35) 0 1px 9px 0 '
              }}
              layout="vertical"
              onSubmit={this.handleSubmit}
            >
              <Form.Item>
                {' '}
                <Title level={4} style={{ textAlign: 'center' }}>
                  Tạo tài khoản admin member
                </Title>
              </Form.Item>
              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập username!'
                    }
                  ]
                })(<Input size="large" />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập password!'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password size="large" />)}
              </Form.Item>
              <Form.Item label="Nhập lại Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập lại Password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    size="large"
                    onBlur={this.handleConfirmBlur}
                  />
                )}
              </Form.Item>
              <div>{this.err}</div>
              <Form.Item>
                <Button
                  style={{ width: '150px', margin: '10px 150px' }}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="btn-sign-up"
                  onClick={event => {
                    event.preventDefault();
                    st.updateUser(
                      this.name,
                      this.phone,
                      st.email,
                      this.image,
                      this.address,
                      this.moreInfo
                    );
                    this.err = 'Cập nhật thành công';
                  }}
                >
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Typography>
      </div>
    );
  }
}
const CreateAdmin = Form.create({ name: 'profile_form' })(CreateAdminForm);
export default CreateAdmin;
