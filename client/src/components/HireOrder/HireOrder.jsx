import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Form, Typography, Button, Input, Radio, Checkbox, Modal } from 'antd';
const { Text } = Typography;

class HireOrderForm extends Component {
  state = {
    loading: false,
    visible: false,
    value: 1
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
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 10000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onChangeRadio = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    const { visible } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        style={{ top: 20 }}
        title="Gửi yêu cầu thuê gia sư"
        onCancel={this.handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ maxHeight: '100%' }}
        >
          <Form.Item label="Môn học">
            {getFieldDecorator('subject', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng chọn môn học'
                }
              ]
            })(<Input placeholder="Nhập môn học cụ thể bạn muốn thuê dạy" />)}
          </Form.Item>
          <Form.Item label="Học phí dự kiến">
            {getFieldDecorator('fee', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng điền học phí dự kiến'
                }
              ]
            })(<Input placeholder="Số tiền dự kiến bạn muốn thuê theo giờ" />)}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng điền số điện thoại'
                }
              ]
            })(<Input placeholder="Số điện thoại liên lạc" />)}
          </Form.Item>
          <Form.Item label="Địa điểm diễn ra">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng điền địa điểm diễn ra'
                }
              ]
            })(<Input placeholder="Địa chỉ cụ thể diễn ra lớp học" />)}
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
              <Radio.Group
                onChange={this.onChangeRadio}
                value={this.state.value}
              >
                <Radio value={1}>1.5 giờ</Radio>
                <Radio value={2}>2 giờ</Radio>
                <Radio value={3}>2.5 giờ</Radio>
                <Radio value={4}>3 giờ</Radio>
                <Radio value={5}>Trao đổi sau</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="Ghi chú thêm">
            <Input.TextArea
              rows={2}
              placeholder="Ghi chú những thông tin cần thiết khác"
            />
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
            <Button onClick={this.handleCancel} style={{ marginRight: 20 }}>
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
const HireOrder = Form.create({ name: 'form-order' })(HireOrderForm);
export default HireOrder;
