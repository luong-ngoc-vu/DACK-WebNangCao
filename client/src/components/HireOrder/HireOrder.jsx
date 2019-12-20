import React, {Component} from 'react';

import 'antd/dist/antd.css';
import {Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Typography} from 'antd';
import moment from 'moment';
import {getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode} from "sub-vn";

const {Text} = Typography;
const date = new Date();

const day = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
const timeDay = [
    {label: 'Sáng', value: 'Thứ hai - sáng'},
    {label: 'Sáng', value: 'Thứ ba - sáng'},
    {label: 'Sáng', value: 'Thứ tư - sáng'},
    {label: 'Sáng', value: 'Thứ năm - sáng'},
    {label: 'Sáng', value: 'Thứ sáu - sáng'},
    {label: 'Sáng', value: 'Thứ bảy - sáng'},
    {label: 'Sáng', value: 'Chủ nhật - sáng'},
    {label: 'Chiều', value: 'Thứ hai - chiều'},
    {label: 'Chiều', value: 'Thứ ba - chiều'},
    {label: 'Chiều', value: 'Thứ tư - chiều'},
    {label: 'Chiều', value: 'Thứ năm - chiều'},
    {label: 'Chiều', value: 'Thứ sáu - chiều'},
    {label: 'Chiều', value: 'Thứ bảy - chiều'},
    {label: 'Chiều', value: 'Chủ nhật - chiều'},
    {label: 'Tối', value: 'Thứ hai - tối'},
    {label: 'Tối', value: 'Thứ ba - tối'},
    {label: 'Tối', value: 'Thứ tư - tối'},
    {label: 'Tối', value: 'Thứ năm - tối'},
    {label: 'Tối', value: 'Thứ sáu - tối'},
    {label: 'Tối', value: 'Thứ bảy - tối'},
    {label: 'Tối', value: 'Chủ nhật - tối'}
];

class HireOrderForm extends Component {

    constructor() {
        super();
        this.numberOfLesson = 1;
        this.provinceCode = '';
        this.provinceName = '';
        this.districtCode = '';
        this.districtName = '';
        this.wardCode = '';
        this.wardName = '';
        this.err = '';
    }

    state = {
        loading: false,
        visible: false,
        dateContract: '',
        totalMoneyContract: 1,
        hourPerLesson: 1.5,
        selectedItems: [],

        checkedList: [],
        indeterminate: true,

        provinceCode: this.provinceCode,
        districtCode: this.districtCode,
        wardCode: this.wardCode,
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    componentWillReceiveProps(nextProp) {
        this.setState({
            visible: nextProp.visible
        });
    }

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 10000);
    };

    handleCancel = () => {
        this.setState({visible: false});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    onChangeRadio = (e) => {
        const st = this.props;
        this.setState({
            hourPerLesson: e.target.value,
            totalMoneyContract: (st.moneyTeacherPerHour * parseInt(this.numberOfLesson) * e.target.value)
        });
        this.hourPerLesson = e.target.value;
    };

    handleChange = (selectedItems) => {
        this.setState({selectedItems});
    };

    onChangeTimeDay = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < timeDay.length,
        });
    };

    render() {
        const st = this.props;
        const {visible} = this.state;
        const {selectedItems} = this.state;
        const OPTIONS = st.skills;
        const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} style={{maxHeight: '100%'}}>
                <Form.Item label="Tên học sinh">
                    <Input
                        style={{width: '100%'}}
                        value={st.nameStudent}
                        readOnly
                    />
                </Form.Item>
                <Form.Item label="Giới tính">
                    <Input
                        style={{width: '100%'}}
                        value={st.genderStudent}
                        readOnly
                    />
                </Form.Item>
                <Form.Item label="Tên giáo viên">
                    <Input
                        style={{width: '100%'}}
                        value={st.nameTeacher}
                        readOnly
                    />
                </Form.Item>
                <Form.Item label={<span>Phí dạy 1 giờ (VND)&nbsp;</span>}>
                    <InputNumber
                        style={{width: '100%'}}
                        value={st.moneyTeacherPerHour}
                        readOnly
                        min={50000}
                        step={10000}
                        size="large"
                        formatter={value =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item label="Môn học">
                    {getFieldDecorator('subject', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn môn học'
                            }
                        ]
                    })(
                        <Select
                            mode="multiple"
                            placeholder="Chọn môn học"
                            defaultValue={st.skills}
                            onChange={this.handleChange}
                            style={{width: '100%', textAlign: 'center'}}
                        >
                            {filteredOptions.map((item) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Số lượng buổi học">
                    {getFieldDecorator('fee', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng điền số lượng buổi học'
                            }
                        ]
                    })
                    (<Input
                            style={{width: '100%'}}
                            onChange={event => {
                                this.numberOfLesson = event.target.value.toString();
                            }}
                            min={1}
                            defaultValue={2}
                            placeholder="Số lượng buổi học"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Chọn tỉnh/ Thành phố">
                    <Select
                        labelInValue
                        onChange={value => {
                            this.setState({provinceCode: value.key, provinceName: value.label});
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
                <Form.Item label="Chọn huyện/ thị xã">
                    <Select
                        showSearch
                        labelInValue
                        onChange={value => {
                            this.setState({districtCode: value.key, districtName: value.label});
                        }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                        size="large"
                    >
                        {getDistrictsByProvinceCode(this.state.provinceCode).map(con => (
                            <Select.Option value={con.code}>{con.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Chọn phường">
                    <Select
                        labelInValue
                        onChange={value => {
                            this.setState({wardCode: value.key, wardName: value.label});
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
                        {getWardsByDistrictCode(this.state.districtCode).map(con => (
                            <Select.Option value={con.code}>{con.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Địa chỉ cụ thể diễn ra học">
                    <Input
                        size="large"
                        onChange={event => {
                            this.address = event.target.value;
                        }}
                        name="address"
                    />
                </Form.Item>
                <Form.Item label="Số giờ mỗi buổi">
                    {getFieldDecorator('hour', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn số giờ mỗi buổi'
                            }
                        ]
                    })(
                        <Radio.Group onChange={this.onChangeRadio} value={this.state.hourPerLesson}>
                            <Radio value={1.5}>1.5 giờ</Radio>
                            <Radio value={2}>2 giờ</Radio>
                            <Radio value={2.5}>2.5 giờ</Radio>
                            <Radio value={3}>3 giờ</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item label="Lịch học trong tuần">
                    {getFieldDecorator('schedule', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn lịch học của bạn!'
                            }
                        ]
                    })(
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
                                    {day.map((day) => <div style={{width: '14%'}}><strong>{day}</strong></div>)}
                                </div>
                            </div>
                            <Row>
                                <Checkbox.Group
                                    options={timeDay}
                                    onChange={this.onChangeTimeDay}/>
                            </Row>
                        </div>
                    )}
                </Form.Item>
                <Form.Item label="Ngày yêu cầu hợp đồng dạy">
                    <DatePicker
                        style={{width: '100%'}}
                        value={moment(date, 'DD/MM/YYYY')}
                        format='DD/MM/YYYY'
                        onChange={value => {
                            this.setState({dateContract: value.format('YYYY-MM-DD')})
                        }}
                    />
                </Form.Item>
                <Form.Item label="Ghi chú thêm">
                    <Input.TextArea
                        rows={2}
                        placeholder="Ghi chú những thông tin cần thiết khác"
                        onChange={event => {
                            this.note = event.target.value;
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={true}>
                        Bạn đồng ý với những điều khoản của Bmentor
                    </Checkbox>
                </Form.Item>
                <div><strong>{this.err}</strong></div>
                {st.curMoneyStudent < this.state.totalMoneyContract && (
                    <div style={{justifyContent: 'center'}}>
                        <strong>Số tiền hiện có ({st.curMoneyStudent}) không đủ để thuê gia sư này. Bạn phải có tối
                            thiểu số tiền là
                            ({this.state.totalMoneyContract})</strong>
                    </div>
                )}
                <Form.Item
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button onClick={this.handleCancel} style={{marginRight: 20}}>
                        Hủy
                    </Button>
                    {st.curMoneyStudent >= this.state.totalMoneyContract && (
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={event => {
                                st.addNewContract(st.idStudent, st.idTeacher, st.nameStudent, st.nameTeacher,
                                    st.genderStudent, st.moneyTeacherPerHour, this.state.totalMoneyContract, this.state.selectedItems,
                                    this.state.checkedList, this.numberOfLesson,
                                    this.address, this.state.provinceName, this.state.districtName, this.state.wardName,
                                    this.hourPerLesson, this.note, this.state.dateContract);

                                this.err = 'Gửi yêu cầu thành công';
                            }}
                        >
                            Gửi yêu cầu
                        </Button>
                    )}
                </Form.Item>
            </Form>

        );
    }
}

const HireOrder = Form.create({name: 'form-order'})(HireOrderForm);
export default HireOrder;

