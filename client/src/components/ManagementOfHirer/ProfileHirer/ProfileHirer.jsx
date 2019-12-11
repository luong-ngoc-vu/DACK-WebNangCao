import React from 'react';
import 'antd/dist/antd.css';
import './ProfileHirer.css';

import Redirect from 'react-router-dom/Redirect';
import {Avatar, Button, Form, Input, Select, Typography} from 'antd';

const {TextArea} = Input;

const {Title} = Typography;


class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.name = '';
        this.email = '';
        this.phone = '';
        this.image = '';
        this.address = '';
        this.moreInfo = '';
        this.err = '';
    }

    state = {
        loading: false,
        addressCity: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleChange(value) {
        console.log("Selected: " + value);
    }

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

        if (st.typeUser === 2) {
            return <Redirect to="/tutor-profile"/>
        }

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
                            {st.isLoginFB === false && st.isLoginGG === false && (
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
                            )}
                            {st.isLoginFB === false && st.isLoginGG === false && (
                                <Form.Item label="Chọn tỉnh/ Thành phố">
                                    <Select
                                        name="addressCity"
                                        placeholder="Chọn thành phố"
                                        defaultValue={st.addressCity}
                                        onChange={value => {
                                            this.setState({addressCity: value});
                                        }}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="large"
                                    >
                                        <Select.Option value={'Thành phố Hồ Chí Minh'}>Thành phố Hồ Chí
                                            Minh</Select.Option>
                                        <Select.Option value={'Hà Nội'}>Hà Nội</Select.Option>
                                        <Select.Option value={'Đà Nẵng'}>Đà Nẵng</Select.Option>
                                        <Select.Option value={'Huế'}>Huế</Select.Option>
                                        <Select.Option value={'Quảng Nam'}>Quảng Nam</Select.Option>
                                        <Select.Option value={'Quảng Ngãi'}>Quảng Ngãi</Select.Option>
                                        <Select.Option value={'Quảng Bình'}>Quảng Bình</Select.Option>
                                        <Select.Option value={'Bình Định'}>Bình Định</Select.Option>
                                        <Select.Option value={'Bình Dương'}>Bình Dương</Select.Option>
                                        <Select.Option value={'Bình Phước'}>Bình Phước</Select.Option>
                                        <Select.Option value={'Tây Ninh'}>Tây Ninh</Select.Option>
                                    </Select>
                                </Form.Item>
                            )}
                            {st.isLoginFB === false && st.isLoginGG === false && (
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
                            )}
                            {st.isLoginFB === false && st.isLoginGG === false && (
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
                            )}
                            {st.isLoginFB === false && st.isLoginGG === false && (
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
                            )}
                            {st.isLoginFB === false && st.isLoginGG === false && (
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
                            )}
                            <div>{this.err}</div>
                            {st.isLogin === true && st.isLoginGG === false && st.isLoginFB === false && (
                                <Form.Item>
                                    <Button
                                        style={{width: '150px', margin: '10px 300px'}}
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        className="btn-sign-up"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            st.updateUser(this.name, this.phone, st.email, this.image, this.address, this.state.addressCity, this.moreInfo);
                                            this.err = 'Cập nhật thành công';
                                        }}>
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            )}
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
