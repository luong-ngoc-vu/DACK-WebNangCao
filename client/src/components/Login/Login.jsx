import React from 'react';
import {Link} from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import {Button, Checkbox, Form, Icon, Input, Typography} from 'antd';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import 'antd/dist/antd.css';
import './Login.css';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.email = '';
        this.password = '';
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
        const {getFieldDecorator} = this.props.form;
        const st = this.props;
        if (st.token === 'err') {
            this.err = 'Email hoặc mật khẩu không chính xác !';
        }
        if (st.isLogin === true && st.typeUser === 1) {
            return <Redirect to="/student-profile"/>;
        } else if (st.isLogin === true && st.typeUser === 2) {
            return <Redirect to="/tutor-profile"/>;
        }

        return (
            <div className="login-form">
                <Typography>
                    <Typography.Title level={3} style={{marginBottom: '20px'}}>
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
                                        <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
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
                                    {required: true, message: 'Xin điền mật khẩu của bạn!'}
                                ]
                            })(
                                <Input
                                    size="large"
                                    prefix={
                                        <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
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
                            })(<Checkbox style={{float: 'left'}}>Remember me</Checkbox>)}
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
                                    if (this.name !== "" && this.password !== "")
                                        st.Login(this.email, this.password);
                                }}
                            >
                                Đăng nhập
                            </Button>
                            <span>Bạn chưa có tài khoản? </span>
                            <Link to="/register">Đăng ký ngay!</Link>
                        </Form.Item>
                    </Form>
                    <div className="btn-social">
                        <FacebookLogin
                            appId="468555120306852"
                            fields="name,email,picture"
                            cssClass="facebook-btn"
                            icon="fa fa-facebook"
                            textButton="Đăng nhập bằng Facebook"
                            callback={(res) => {
                                st.LoginFB(res)
                            }}
                        />
                        <GoogleLogin
                            className="google-btn"
                            clientId="986011408031-fcsncbckfjdtv8085179rfu1n6p70psf.apps.googleusercontent.com"
                            buttonText="Đăng nhập bằng Google"
                            cookiePolicy={'single_host_origin'}
                            onSuccess={(res) => {
                                st.LoginGG(res)
                            }}
                        />
                    </div>
                </Typography>
            </div>
        );
    }
}

export const Login = Form.create({name: 'normal_login'})(LoginForm);
