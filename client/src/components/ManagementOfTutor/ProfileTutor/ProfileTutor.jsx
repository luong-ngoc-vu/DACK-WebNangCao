import React from 'react';
import 'antd/dist/antd.css';
import './ProfileTutor.css';

import {Avatar, Button, Checkbox, Form, Input, InputNumber, Row, Select, TreeSelect, Typography, Col} from 'antd';
import Redirect from 'react-router-dom/Redirect';
import {getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode} from 'sub-vn';

const {SHOW_PARENT} = TreeSelect;

const {TextArea} = Input;

const {Title} = Typography;

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
    {label: 'Sáng', value: 21},
    {label: 'Sáng', value: 31},
    {label: 'Sáng', value: 41},
    {label: 'Sáng', value: 51},
    {label: 'Sáng', value: 61},
    {label: 'Sáng', value: 71},
    {label: 'Sáng', value: 81},
    {label: 'Chiều', value: 22},
    {label: 'Chiều', value: 32},
    {label: 'Chiều', value: 42},
    {label: 'Chiều', value: 52},
    {label: 'Chiều', value: 62},
    {label: 'Chiều', value: 72},
    {label: 'Chiều', value: 82},
    {label: 'Tối', value: 23},
    {label: 'Tối', value: 33},
    {label: 'Tối', value: 43},
    {label: 'Tối', value: 53},
    {label: 'Tối', value: 63},
    {label: 'Tối', value: 73},
    {label: 'Tối', value: 83}
];

class ProfileForm extends React.Component {
    constructor() {
        super();
        this.provinceCode = '';
        this.provinceName = '';
        this.districtCode = '';
        this.districtName = '';
        this.wardCode = '';
        this.wardName = '';

        this.levelStudy = '';
        this.curPosition = '';
        this.teacherTimeDay = [];

        this.gender = '';

        this.err = '';
    }

    state = {
        provinceCode: this.provinceCode,
        districtCode: this.districtCode,
        wardCode: this.wardCode,

        loading: false,
        levelStudy: this.levelStudy,
        curPosition: this.curPosition,
        dataSkills: [],
        gender: this.gender,

        checkedList: [],
        indeterminate: true,

        value: [""]
    };

    onTreeChange = value => {
        console.log("select tree: " + value);
        this.setState({value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < timeDay.length
        });
    };

    componentDidMount() {
        fetch('http://localhost:4000/user/getSkills')
            .then(response => response.json())
            .then(data => this.setState({dataSkills: data}));
    }

    render() {
        const st = this.props;
        const {dataSkills} = this.state;

        const treeData = dataSkills.map((item) => ({
            title: item.name,
            value: item.name,
            key: item.name,
            children: item.children.map(children => ({
                title: children,
                value: children,
                key: children
            })),
        }));

        this.levelStudy = st.levelStudy;
        this.curPosition = st.curPosition;
        this.gender = st.gender;
        this.teacherTimeDay = st.teacherTimeDay;
        let tProps;

        if (st.skills.length === 0) {
            tProps = {
                treeData,
                value: this.state.value,
                onChange: this.onTreeChange,
                treeCheckable: true,
                searchPlaceholder: "Please select",
                style: {
                    width: "100%"
                },
                maxTagCount: 3
            };
        } else {
            tProps = {
                treeData,
                onChange: this.onTreeChange,
                treeCheckable: true,
                searchPlaceholder: "Please select",
                style: {
                    width: "100%"
                },
                defaultValue: st.skills,
                maxTagCount: 3
            };
        }

        if (st.isLogin === false) {
            return <Redirect to="/login"/>;
        }

        if (st.typeUser === 1) {
            return <Redirect to="/hire-manage"/>;
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
                            <Row gutter={15}>
                                <Col span={12}><Form.Item label="Tên đầy đủ">
                                <Input
                                    size="large"
                                    defaultValue={st.name}
                                    name="name"
                                    onChange={event => {
                                        this.name = event.target.value;
                                    }}
                                />
                                </Form.Item></Col>
                                <Col span={6}>
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
                                </Col>
                                <Col span={6}> {st.isLoginFB === false && st.isLoginGG === false && (
                                <Form.Item label="Giới tính">
                                    <Select
                                        defaultValue={st.gender}
                                        onChange={value => {
                                            this.setState({gender: value});
                                        }}
                                        size="large"
                                    >
                                        <Select.Option value={'Nam'}>Nam</Select.Option>
                                        <Select.Option value={'Nữ'}>Nữ</Select.Option>
                                    </Select>
                                </Form.Item>
                            )}</Col>
                            </Row>
                            
                            
                            <Row gutter={15}>
                                <Col span={12}>{st.isLoginFB === false && st.isLoginGG === false && (
                                <Form.Item label="Chọn tỉnh/ Thành phố">
                                    <Select
                                        labelInValue
                                        defaultValue={{key: st.provinceName}}
                                        onChange={value => {
                                            this.setState({
                                                provinceCode: value.key,
                                                provinceName: value.label
                                            });
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
                                        {getProvinces().map(con => (
                                            <Select.Option value={con.code}>{con.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )}</Col>
                                <Col span={6}>{st.isLoginFB === false && st.isLoginGG === false && (
                                <Form.Item label="Chọn huyện/ thị xã">
                                    <Select
                                        showSearch
                                        labelInValue
                                        defaultValue={{key: st.districtName}}
                                        onChange={value => {
                                            this.setState({
                                                districtCode: value.key,
                                                districtName: value.label
                                            });
                                        }}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="large"
                                    >
                                        {getDistrictsByProvinceCode(this.state.provinceCode).map(
                                            con => (
                                                <Select.Option value={con.code}>
                                                    {con.name}
                                                </Select.Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            )}</Col>
                                <Col span={6}>{st.isLoginFB === false && st.isLoginGG === false && (
                                <Form.Item label="Chọn phường">
                                    <Select
                                        defaultValue={{key: st.wardName}}
                                        labelInValue
                                        onChange={value => {
                                            this.setState({
                                                wardCode: value.key,
                                                wardName: value.label
                                            });
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
                                        {getWardsByDistrictCode(this.state.districtCode).map(
                                            con => (
                                                <Select.Option value={con.code}>
                                                    {con.name}
                                                </Select.Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            )}</Col>
                           </Row>
                            
                            
                            
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
                                        placeholder="Mô tả ngắn gọn về bản thân"
                                        rows={4}
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
                                            data.append('api_key', '725237476677898');
                                            data.append('api_secret', '5bN8m-49GwuIPffqiipf20h9eLI');

                                            const res = await fetch(
                                                'https://api.cloudinary.com/v1_1/dtrty0qol/image/upload',
                                                {
                                                    method: 'POST',
                                                    body: data
                                                }
                                            );
                                            const file = await res.json();
                                            this.image = file.url;
                                        }}
                                    />
                                </Form.Item>
                            )}
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
                        <Row gutter={15}>
                            <Col span={12}>
                            <Form.Item label="Nhập tên trường đã theo học">
                            <Input
                                size="large"
                                placeholder="Trường bạn đã theo học"
                                defaultValue={st.school}
                                name="school"
                                onChange={event => {
                                    this.school = event.target.value;
                                }}
                            />
                        </Form.Item>
                            </Col>
                            <Col span={6}>
                            <Form.Item label="Chọn trình độ học vấn">
                            <Select
                                style={{width: '100%'}}
                                placeholder="Chọn trình độ học vấn"
                                name="levelStudy"
                                defaultValue={st.levelStudy}
                                onChange={value => {
                                    this.setState({levelStudy: value});
                                }}
                                size="large"
                                optionFilterProp="children"
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Select.Option value={'Đại học'}>Đại học</Select.Option>
                                <Select.Option value={'Cao đẳng'}>Cao đẳng</Select.Option>
                                <Select.Option value={'Cao học'}>Cao học</Select.Option>
                                <Select.Option value={'Tiến sĩ'}>Tiến sĩ</Select.Option>
                                <Select.Option value={'Thạc sĩ'}>Thạc sĩ</Select.Option>
                                <Select.Option value={'Trung học'}>Trung học</Select.Option>
                            </Select>
                        </Form.Item>
                            </Col>
                            <Col span={6}><Form.Item label="Hiện tại là">
                            <Select
                                style={{width: '100%'}}
                                placeholder="Chọn chức danh, cấp bậc của bạn"
                                optionFilterProp="children"
                                showSearch
                                name="curPosition"
                                defaultValue={st.curPosition}
                                onChange={value => {
                                    this.setState({curPosition: value});
                                }}
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                size="large"
                            >
                                <Select.Option value={'Gia sư'}>Gia sư</Select.Option>
                                <Select.Option value={'Sinh viên'}>Sinh viên</Select.Option>
                                <Select.Option value={'Giáo viên'}>Giáo viên</Select.Option>
                                <Select.Option value={'Du học sinh'}>Du học sinh</Select.Option>
                                <Select.Option value={'Người đi làm'}>
                                    Người đi làm
                                </Select.Option>
                                <Select.Option value={'Học sinh'}>Học sinh</Select.Option>
                                <Select.Option value={'Chức danh khác'}>
                                    Chức danh khác
                                </Select.Option>
                            </Select>
                        </Form.Item></Col>
                        </Row>
                        
                        
                        
                        <Form.Item label="Thành tích, bằng cấp và kinh nghiệm giảng dạy">
                            <TextArea
                                rows={3}
                                placeholder="Mô tả chi tiết về kinh nghiệm, thành tích bản thân trong công tác giảng dạy..."
                                defaultValue={st.certificates}
                                name="certificates"
                                onChange={event => {
                                    this.certificates = event.target.value;
                                }}
                            />
                        </Form.Item>
                        <Form.Item label={<span>Môn học bạn sẽ dạy&nbsp;</span>}>
                            <TreeSelect {...tProps} />
                        </Form.Item>
                        <Form.Item label={<span>Phí dạy 1 buổi (VND)&nbsp;</span>}>
                            <InputNumber
                                style={{width: '100%'}}
                                onChange={event => {
                                    this.money = event.valueOf();
                                }}
                                defaultValue={st.money}
                                min={50000}
                                step={10000}
                                size="large"
                                formatter={value =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="Nhập học phí thuê theo giờ"
                            />
                        </Form.Item>
                        <Form.Item label={<span>Tổng tiền hiện có (VND)&nbsp;</span>}>
                            <InputNumber
                                style={{width: '100%'}}
                                readOnly
                                defaultValue={st.totalMoney}
                                size="large"
                                formatter={value =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item label="Lịch bạn có thể nhận lớp">
                            <div>
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        {day.map(day => (
                                            <div style={{width: '14%'}}>
                                                <strong>{day}</strong>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Row>
                                    <Checkbox.Group
                                        defaultValue={st.teacherTimeDay}
                                        options={timeDay}
                                        onChange={this.onChange}
                                    />
                                </Row>
                            </div>
                        </Form.Item>
                        <div>
                            <strong>{this.err}</strong>
                        </div>
                        <Form.Item
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}
                        >
                            <Button
                                style={{minWidth: '150px'}}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="btn-sign-up"
                                onClick={event => {
                                    st.updateUser(
                                        this.name,
                                        this.phone,
                                        st.email,
                                        this.image,
                                        this.state.gender,
                                        this.moreInfo,
                                        this.address,
                                        this.state.provinceName,
                                        this.state.districtName,
                                        this.state.wardName,
                                        this.state.levelStudy,
                                        this.state.curPosition,
                                        this.certificates,
                                        this.school,
                                        this.money,
                                        this.state.checkedList,
                                        this.state.value
                                    );
                                    this.err = 'Cập nhật thành công';
                                }}
                            >
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
