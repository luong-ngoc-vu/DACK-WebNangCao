import React from 'react';
import 'antd/dist/antd.css';
import './ProfileHirer.css';

import Redirect from 'react-router-dom/Redirect';
import {Avatar, Button, Form, Icon, Input, Layout, Typography} from 'antd';

const {Content} = Layout;
const {TextArea} = Input;

const {Title, Text} = Typography;


class ProfileForm extends React.Component {
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

        this.name = st.name;
        this.email = st.email;
        this.phone = st.phone;
        this.image = st.image;
        this.address = st.address;
        this.moreInfo = st.moreInfo;

        if (st.isLogin === false) {
            return <Redirect to="/login"/>
        }

        const {getFieldDecorator} = this.props.form;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Hình đại diện</div>
            </div>
        );
        return (
            <div>
                <Typography className="typo-data">
                    <div>
                        <Title level={4}>Cập nhật thông tin cá nhân</Title>
                        <br/>
                        <Avatar size={150} src={st.image}/>
                        <Form
                            style={{padding: '0px 50px'}}
                            layout="vertical"
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Item label="Địa chỉ email">
                                <Input
                                    size="large"
                                    defaultValue={st.email}
                                    readOnly
                                    name="email"
                                />
                            </Form.Item>
                            <Form.Item label="Tên đầy đủ">
                                <Input
                                    size="large"
                                    defaultValue={st.name}
                                    name="name"
                                    onChange={event => {
                                        this.name = event.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Số điện thoại">
                                <Input
                                    size="large"
                                    defaultValue={st.phone}
                                    onChange={event => {
                                        this.phone = event.target.value;
                                    }}
                                    name="phone"
                                />
                            </Form.Item>
                            <Form.Item label="Địa chỉ cụ thể">
                                <Input
                                    size="large"
                                    defaultValue={st.address}
                                    onChange={event => {
                                        this.address = event.target.value;
                                    }}
                                    name="address"
                                />
                            </Form.Item>
                            <Form.Item label="Thông tin mô tả bản thân">
                                <TextArea
                                    rows={3}
                                    defaultValue={st.moreInfo}
                                    name="moreInfo"
                                    onChange={event => {
                                        this.moreInfo = event.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Avatar URL">
                                <Input
                                    size="large"
                                    defaultValue={st.image}
                                    name="image"
                                    onChange={event => {
                                        this.image = event.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Choose Avatar">
                                <Input
                                    size="large"
                                    type="file"
                                    name="file"
                                    onChange={async e => {
                                        const {files} = e.target;
                                        const data = new FormData();
                                        data.append('file', files[0]);
                                        data.append('upload_preset', 'jq0gfqp1');
                                        data.append("api_key", "725237476677898");
                                        data.append("api_secret", '5bN8m-49GwuIPffqiipf20h9eLI');

                                        const res = await fetch('https://api.cloudinary.com/v1_1/dtrty0qol/image/upload', {
                                            method: 'POST',
                                            body: data
                                        });
                                        const file = await res.json();
                                        this.image = file.url;
                                    }}/>
                            </Form.Item>
                            <div>{this.err}</div>
                            <Form.Item>
                                <Button
                                    style={{width: '150px', margin: '10px 300px'}}
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-sign-up"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        st.updateUser(this.name, this.phone, st.email, this.image, this.address, this.moreInfo);
                                        this.err = 'Cập nhật thành công';
                                    }}>
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Typography>
            </div>
        )
            ;
    }
}

const ProfileHirer = Form.create({name: 'profile_form'})(ProfileForm);
export default ProfileHirer;
