import React, {Component} from 'react';

import 'antd/dist/antd.css';
import {Button, Checkbox, Form, Input, InputNumber, Modal, Radio, Row, Select, Typography} from 'antd';

const {Text} = Typography;

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

class HireOrderForm extends Component {
    state = {
        loading: false,
        visible: false,
        value: 1,
        selectedItems: []
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
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value
        });
    };

    handleChange = (selectedItems) => {
        this.setState({selectedItems});
    };

    render() {
        const st = this.props;
        const {visible} = this.state;
        const {selectedItems} = this.state;
        const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
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
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                visible={visible}
                style={{top: 20, width: 600, minWidth: 600}}
                title="Gửi yêu cầu thuê gia sư"
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form layout="vertical" onSubmit={this.handleSubmit} style={{maxHeight: '100%'}}>
                    <Form.Item label="Tên học sinh">
                        <Input
                            style={{width: '100%'}}
                            placeholder="Tên học sinh"
                            value={st.nameStudent}
                            readOnly
                        />
                    </Form.Item>
                    <Form.Item label="Tên giáo viên">
                        <Input
                            style={{width: '100%'}}
                            placeholder="Tên giáo viên"
                            value={st.name}
                            readOnly
                        />
                    </Form.Item>
                    <Form.Item label="Số điện thoại giáo viên">
                        <InputNumber
                            style={{width: '100%'}}
                            placeholder="Số điện thoại liên lạc"
                            value={st.phone}
                            readOnly
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
                                placeholder="Inserted are removed"
                                value={selectedItems}
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
                    <Form.Item label="Số lượng người học">
                        {getFieldDecorator('fee', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Vui lòng điền số lượng người học'
                                }
                            ]
                        })(<InputNumber style={{width: '100%'}} min={1} max={10} defaultValue={2}/>)}
                    </Form.Item>
                    <Form.Item label="Địa điểm diễn ra">
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Vui lòng điền địa điểm diễn ra'
                                }
                            ]
                        })(<Input placeholder="Địa chỉ cụ thể diễn ra lớp học"/>)}
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
                            <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                                <Radio value={1}>1.5 giờ</Radio>
                                <Radio value={2}>2 giờ</Radio>
                                <Radio value={3}>2.5 giờ</Radio>
                                <Radio value={4}>3 giờ</Radio>
                                <Radio value={5}>Trao đổi sau</Radio>
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
                                        {day.map((day) => <div style={{width: '14%'}}>{day}</div>)}
                                    </div>
                                </div>
                                <Row>
                                    <Checkbox.Group options={timeDay}/>
                                </Row>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="Ghi chú thêm">
                        <Input.TextArea rows={2} placeholder="Ghi chú những thông tin cần thiết khác"/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox checked={true} onChange={this.handleChange}>
                            Bạn đồng ý với những điều khoản của Bmentor
                        </Checkbox>
                    </Form.Item>
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
                        <Button type="primary" htmlType="submit" onClick={this.handleOk}>
                            Gửi yêu cầu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const HireOrder = Form.create({name: 'form-order'})(HireOrderForm);
export default HireOrder;
