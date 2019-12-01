import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './ProfileTutor.css';

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
  message,
  Select,
  InputNumber,
  Checkbox,
  List
} from 'antd';

const { Content } = Layout;
const { TextArea } = Input;

const { Title, Text } = Typography;

//upload function
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
    loading: false,
    selectedItems: []
  };

  handleChangeUpload = info => {
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

  handleChangeSubject = selectedItems => {
    this.setState({ selectedItems });
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
      { label: 'Sáng', value: '21' },
      { label: 'Sáng', value: '31' },
      { label: 'Sáng', value: '41' },
      { label: 'Sáng', value: '51' },
      { label: 'Sáng', value: '61' },
      { label: 'Sáng', value: '71' },
      { label: 'Sáng', value: '81' },
      { label: 'Chiều', value: '22' },
      { label: 'Chiều', value: '32' },
      { label: 'Chiều', value: '42' },
      { label: 'Chiều', value: '52' },
      { label: 'Chiều', value: '62' },
      { label: 'Chiều', value: '72' },
      { label: 'Chiều', value: '82' },
      { label: 'Tối', value: '23' },
      { label: 'Tối', value: '33' },
      { label: 'Tối', value: '43' },
      { label: 'Tối', value: '53' },
      { label: 'Tối', value: '63' },
      { label: 'Tối', value: '73' },
      { label: 'Tối', value: '83' }
    ];
    //option data subject
    const OPTIONS = [
      'Toán ôn thi ĐH',
      'Lý ôn thi HSG',
      'Tiếng anh giao tiếp',
      'Hóa ôn thi ĐH'
    ];

    //upload button
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Hình đại diện</div>
      </div>
    );
    const { imageUrl, selectedItems } = this.state;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

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
                onChange={this.handleChangeUpload}
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
                style={{ width: 400 }}
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
            </Form>
          </div>
        </Typography>
        <Typography className="typo-data">
          <Title level={4}>Hồ sơ gia sư</Title>
          <Form
            style={{ padding: '0px 50px' }}
            layout="vertical"
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              label={
                <span>
                  Học vấn của bạn&nbsp;
                  <Tooltip title="Hãy cung cấp những thông tin gần đây nhất của bạn?">
                    <Icon type="question-circle-o" />
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
              })(<Input size="large" placeholder="Trường bạn đã theo học" />)}
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
                  style={{ width: 400 }}
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
                  style={{ width: '100%' }}
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
                  style={{ width: 400 }}
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
                  <div style={{ width: '100%', display: 'flex' }}>
                    {day.map(day => (
                      <Text style={{ width: 107, textAlign: 'left' }}>
                        {day}
                      </Text>
                    ))}
                  </div>
                  <Checkbox.Group options={timeDay} />
                </div>
              )}
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
        </Typography>
      </div>
    );
  }
}

const ProfileTutor = Form.create({ name: 'profile_form' })(ProfileForm);
export default ProfileTutor;
