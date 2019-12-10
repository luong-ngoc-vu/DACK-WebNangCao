import React from 'react';
import './CreateAdmin.css';
import 'antd/dist/antd.css';
import {Button, Form, Input, Typography} from 'antd';

<<<<<<< HEAD
const {Title, Text} = Typography;
=======
import { Redirect } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';

const { Title, Text } = Typography;
>>>>>>> 7f657e8cff3a9535ac3df94803dc082944446bfb

class CreateAdminForm extends React.Component {
    constructor() {
        super();
        this.email = '';
        this.password = '';
        this.repass = '';
        this.err = '';
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Hai mật khẩu không trùng khớp!');
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
        if (st.isCreateAdmin === 'err') {
            this.err = 'Có lỗi trong quá trình xử lý, vui lòng thử lại !';
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form
                    style={{
                        width: 400,
                        margin: '0px auto',
                        padding: '10px 20px',
                        border: '1px solid #e0e0e0'
                    }}
                    layout="vertical"
                    onSubmit={this.handleSubmit}
                >
                    <Form.Item>
                        {' '}
                        <Title level={4} style={{textAlign: 'center'}}>
                            Tạo tài khoản Admin
                        </Title>
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
                    <Form.Item label="Mật khẩu" hasFeedback>
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
                    <Form.Item label="Nhập lại mật khẩu" hasFeedback>
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
                                    this.repass = event.target.value;
                                }}
                                onBlur={this.handleConfirmBlur}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}
                        >{this.err}
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Button
                                style={{width: '150px', margin: 'auto'}}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="btn-sign-up"
                                onClick={event => {
                                    event.preventDefault();
                                    if (this.email !== "" && this.password !== "" && this.repassword !== "")
                                        st.CreateAdmin(this.email, this.password);
                                    this.err = 'Tạo tài khoản Admin thành công !';
                                }}
                            >
                                Tạo tài khoản
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const CreateAdmin = Form.create({name: 'profile_form'})(CreateAdminForm);
export default CreateAdmin;
