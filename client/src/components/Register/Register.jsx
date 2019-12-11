import React from 'react';
import {Link, Redirect} from 'react-router-dom';


import 'antd/dist/antd.css';
import './Register.css';
import {Button, Form, Icon, Input, Radio, Tooltip, Typography} from 'antd';

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.name = '';
        this.phone = '';
        this.typeUser = 1;
        this.err = '';
    }

    state = {
        confirmDirty: false,
        typeUser: 1,
        autoCompleteResult: []
    };
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Password nhập lại không chính xác !');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
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
        if (st.isRegister === 'err') {
            this.err = 'Có lỗi trong quá trình xử lý, vui lòng thử lại !';
        }
        if (st.checkRegister) {
            return <Redirect to="/login"/>;
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="register-form">
                <Typography>
                    <Typography.Title level={3}>Đăng ký tài khoản</Typography.Title>
                    <div>
                        <Form
                            layout="vertical"
                            onSubmit={this.handleSubmit}
                            style={{textAlign: 'center'}}
                        >
                            <Form.Item
                                style={{
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                            >
                                <Radio.Group
                                    onChange={e => {
                                        this.setState({typeUser: e.target.value});
                                        this.typeUser = e.target.value;
                                    }}
                                    value={this.state.typeUser}
                                    name="typeUser"
                                >
                                    <Radio
                                        value={1}
                                        style={{color: '#6290FF', margin: '10px 50px'}}
                                    >
                                        Thuê gia sư
                                    </Radio>
                                    <Radio
                                        value={2}
                                        style={{color: '#6290FF', marginLeft: '20px'}}
                                    >
                                        Gia sư
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Họ tên đầy đủ">
                                {getFieldDecorator('fullname', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đầy đủ !'
                                        }
                                    ]
                                })(<Input
                                    required
                                    size="large"
                                    placeholder="Họ tên đầy đủ của bạn"
                                    onChange={event => {
                                        this.name = event.target.value;
                                    }}
                                    name="name"
                                    autoFocus
                                />)}
                            </Form.Item>
                            <Form.Item label="E-mail đăng nhập">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'Email không đúng định dạng !'
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập địa chỉ email !'
                                        }
                                    ]
                                })(
                                    <Input
                                        placeholder="Nhập email tài khoản đăng nhập"
                                        size="large"
                                        onChange={event => {
                                            this.email = event.target.value;
                                        }}
                                        name="email"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span>
                    Số điện thoại&nbsp;
                                        <Tooltip
                                            title="Hãy cung cấp số điện thoại của bạn để nhận được sự phục vụ tốt nhất?">
                      <Icon type="question-circle-o"/>
                    </Tooltip>
                  </span>
                                }
                            >
                                {getFieldDecorator('nickname', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại của bạn!',
                                            whitespace: true
                                        }
                                    ]
                                })(<Input
                                    type="number"
                                    size="large"
                                    placeholder="Số điện thoại liên lạc"
                                    onChange={event => {
                                        this.phone = event.target.value;
                                    }}
                                    name="phone"
                                />)}
                            </Form.Item>
                            <Form.Item label="Password" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!'
                                        },
                                        {
                                            validator: this.validateToNextPassword
                                        }
                                    ]
                                })(<Input.Password
                                    placeholder="Nhập mật khẩu"
                                    size="large"
                                    onChange={event => {
                                        this.password = event.target.value;
                                    }}
                                    name="password"
                                />)}
                            </Form.Item>
                            <Form.Item label="Confirm Password" hasFeedback>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập lại mật khẩu !'
                                        },
                                        {
                                            validator: this.compareToFirstPassword
                                        }
                                    ]
                                })(
                                    <Input.Password
                                        placeholder="Nhập lại mật khẩu"
                                        size="large"
                                        onChange={event => {
                                            this.repassword = event.target.value;
                                        }}
                                        onBlur={this.handleConfirmBlur}
                                    />
                                )}
                            </Form.Item>
                            <div><b>{this.err}</b></div>
                            <Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-sign-up"
                                    onClick={event => {
                                        event.preventDefault();
                                        if (this.name === "" || this.phone === "" || this.email === "" || this.password === ""
                                            || this.repassword === "")
                                            this.err = 'Vui lòng nhập đủ các dữ liệu đăng ký';
                                        if (this.name !== "" && this.phone !== "" && this.email !== "" && this.password !== ""
                                            && this.repassword !== "")
                                            st.Register(this.name, this.phone, this.email, this.password, this.typeUser);
                                    }}
                                >
                                    Đăng ký
                                </Button>
                                <div style={{textAlign: 'center'}}>
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

export const Register = Form.create({name: 'normal_Register'})(RegisterForm);
