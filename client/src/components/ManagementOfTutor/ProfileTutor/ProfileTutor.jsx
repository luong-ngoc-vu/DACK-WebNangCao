import React from 'react';
import 'antd/dist/antd.css';
import './ProfileTutor.css';

import {Avatar, Button, Checkbox, Form, Icon, Input, InputNumber, Select, Tooltip, Typography} from 'antd';
import Redirect from "react-router-dom/Redirect";

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
        loading: false,
        selectedItems: []
    };

    handleChangeSubject = selectedItems => {
        this.setState({selectedItems});
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

        if (st.typeUser === 1) {
            return <Redirect to="/student-profile"/>
        }

        const {getFieldDecorator} = this.props.form;
        const day = [
            'Thứ hai',
            'Thứ ba',
            'Thứ tư',
            'Thứ năm',
            'Thứ sáu',
            'Thứ bảy',
            'Chủ nhật'
        ];

        const timeDay = [
            {label: 'Sáng', value: '21'},
            {label: 'Sáng', value: '31'},
            {label: 'Sáng', value: '41'},
            {label: 'Sáng', value: '51'},
            {label: 'Sáng', value: '61'},
            {label: 'Sáng', value: '71'},
            {label: 'Sáng', value: '81'},
            {label: 'Chiều', value: '22'},
            {label: 'Chiều', value: '32'},
            {label: 'Chiều', value: '42'},
            {label: 'Chiều', value: '52'},
            {label: 'Chiều', value: '62'},
            {label: 'Chiều', value: '72'},
            {label: 'Chiều', value: '82'},
            {label: 'Tối', value: '23'},
            {label: 'Tối', value: '33'},
            {label: 'Tối', value: '43'},
            {label: 'Tối', value: '53'},
            {label: 'Tối', value: '63'},
            {label: 'Tối', value: '73'},
            {label: 'Tối', value: '83'}
        ];
        const OPTIONS = [
            'Toán ôn thi ĐH',
            'Lý ôn thi HSG',
            'Tiếng anh giao tiếp',
            'Hóa ôn thi ĐH'
        ];
        const {selectedItems} = this.state;
        const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

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
                        </Form>
                    </div>
                </Typography>

                <Typography className="typo-data">
                    <Title level={4}>Hồ sơ gia sư</Title>
                    <Form
                        style={{padding: '0px 50px'}}
                        layout="vertical"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Item
                            label={
                                <span>
                  Học vấn của bạn&nbsp;
                                    <Tooltip title="Hãy cung cấp những thông tin gần đây nhất của bạn?">
                    <Icon type="question-circle-o"/>
                  </Tooltip>
                </span>
                            }
                        >
                            {getFieldDecorator('school', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Xin nhập thông tin học vấn của bạn!'
                                    }
                                ]
                            })(<Input size="large" placeholder="Trường bạn đã theo học"/>)}
                        </Form.Item>
                        <Form.Item label="Hiện tại là">
                            {getFieldDecorator('degree', {
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            })(
                                <Select
                                    showSearch
                                    style={{width: 400}}
                                    placeholder="Chọn chức danh, cấp bậc của bạn"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    size="large"
                                >
                                    <Select.Option value="1">Gia sư</Select.Option>

                                    <Select.Option value="2">Sinh viên</Select.Option>
                                    <Select.Option value="3">Giáo viên</Select.Option>
                                    <Select.Option value="4">Du học sinh</Select.Option>
                                    <Select.Option value="5">Người đi làm</Select.Option>
                                    <Select.Option value="6">Học sinh</Select.Option>
                                    <Select.Option value="7">Chức danh khác</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Thành tích, bằng cấp và kinh nghiệm giảng dạy">
                            <TextArea
                                rows={3}
                                placeholder="Mô tả chi tiết về kinh nghiệm, thành tích bản thân trong công tác giảng dạy..."
                            />
                        </Form.Item>
                        <Form.Item label={<span>Môn học bạn sẽ dạy&nbsp;</span>}>
                            {getFieldDecorator('subject', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Xin chọn những môn bạn sẽ dạy!'
                                    }
                                ]
                            })(
                                <Select
                                    maxTagCount={5}
                                    mode="multiple"
                                    value={selectedItems}
                                    onChange={this.handleChangeSubject}
                                    style={{width: '100%'}}
                                >
                                    {filteredOptions.map(item => (
                                        <Select.Option key={item} value={item}>
                                            {item}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label={<span>Phí dạy 1 giờ (VND)&nbsp;</span>}>
                            {getFieldDecorator('fee', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Xin nhập thông tin học phí theo giờ!'
                                    }
                                ]
                            })(
                                <InputNumber
                                    style={{width: 400}}
                                    min={50000}
                                    step={10000}
                                    max={2000000}
                                    size="large"
                                    formatter={value =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    placeholder="Nhập học phí thuê theo giờ"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Lịch bạn có thể nhận lớp">
                            {getFieldDecorator('fee', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Xin nhập thông tin học phí theo giờ!'
                                    }
                                ]
                            })(
                                <div>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        {day.map(day => (
                                            <Text style={{width: 107, textAlign: 'left'}}>
                                                {day}
                                            </Text>
                                        ))}
                                    </div>
                                    <Checkbox.Group options={timeDay}/>
                                </div>
                            )}
                        </Form.Item>
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
                </Typography>
            </div>
        );
    }
}

const ProfileTutor = Form.create({name: 'profile_form'})(ProfileForm);
export default ProfileTutor;
