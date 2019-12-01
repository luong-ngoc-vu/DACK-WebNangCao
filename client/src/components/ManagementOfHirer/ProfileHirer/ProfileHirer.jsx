import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './ProfileHirer.css';

import {
  Button,
  Typography,
  Layout,
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Descriptions,
  Avatar,
  Upload,
  message
} from 'antd';
const { Content } = Layout;
const { TextArea } = Input;

const { Title, Text } = Typography;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ProfileForm extends React.Component {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
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
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Hình đại diện</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <Typography className="typo-data">
          <Title level={4}>Thông tin của bạn</Title>
          <Row>
            <Col span={16}>
              <Descriptions
                style={{ textAlign: 'left', padding: '10px 50px' }}
                layout="horizontal"
                column={1}
              >
                <Descriptions.Item label="Họ tên đầy đủ">
                  <Text type="warning">Bùi Tuấn Vũ</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Email đăng nhập">
                  <Text type="warning">tuanvu1023@gmail.com</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  <Text type="warning">0338205969</Text>
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ">
                  <Text code type="danger">
                    Đang cập nhật
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Thông tin thêm">
                  <Text code type="danger">
                    Đang cập nhật
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={8} className="avatar-user">
              {/* <Avatar
                size={128}
                icon="user"
                //src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              /> */}
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          </Row>
        </Typography>

        <Typography className="typo-data">
          <div>
            <Title level={4}>Cập nhật thông tin cá nhân</Title>
            <Form
              style={{ padding: '0px 50px' }}
              layout="vertical"
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                label={
                  <span>
                    Số điện thoại&nbsp;
                    <Tooltip title="Hãy cung cấp số điện thoại của bạn để nhận được sự phục vụ tốt nhất?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                      message: 'Xin nhập số điện thoại của bạn!'
                    }
                  ]
                })(<Input size="large" placeholder="Số điện thoại liên lạc" />)}
              </Form.Item>
              <Form.Item label="Địa chỉ cụ thể">
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input size="large" placeholder="Họ tên đầy đủ của bạn" />)}
              </Form.Item>
              <Form.Item label="Thông tin mô tả bản thân">
                <TextArea
                  rows={3}
                  placeholder="Mô tả thêm thông tin về bạn cho mọi người hiểu bạn hơn..."
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: '150px', margin: '10px 300px' }}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="btn-sign-up"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Typography>
      </div>
    );
  }
}

const ProfileHirer = Form.create({ name: 'profile_form' })(ProfileForm);
export default ProfileHirer;
