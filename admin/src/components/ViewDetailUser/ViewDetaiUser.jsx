import React from 'react';
import 'antd/dist/antd.css';
import './ViewDetailUser.css';
import {Form, Input, Typography} from 'antd';

const {TextArea} = Input;

const {Title} = Typography;


class ProfileForm extends React.Component {

    render() {
        const st = this.props;
        return (
            <div>
                <Typography className="typo-data">
                    <div>
                        <Title level={4}>Xem thông tin chi tiết thông tin <b>{st.name}</b></Title>
                        <br/>
                        <Form
                            style={{padding: '0px 50px'}}
                            layout="vertical">
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
                                    readOnly
                                    defaultValue={st.name}
                                    name="name"
                                />
                            </Form.Item>
                            <Form.Item label="Số điện thoại">
                                <Input
                                    size="large"
                                    readOnly
                                    defaultValue={st.phone}
                                    name="phone"
                                />
                            </Form.Item>
                            {st.typeUser === 1 && (
                                <Form.Item label="Loại tài khoản">
                                    <Input
                                        size="large"
                                        readOnly
                                        defaultValue="Học viên"
                                        name="phone"
                                    />
                                </Form.Item>
                            )}
                            {st.typeUser === 2 && (
                                <Form.Item label="Loại tài khoản">
                                    <Input
                                        size="large"
                                        readOnly
                                        defaultValue="Giáo viên"
                                        name="phone"
                                    />
                                </Form.Item>
                            )}
                            <Form.Item label="Tỉnh/ Thành phố">
                                <Input
                                    size="large"
                                    readOnly
                                    defaultValue={st.addressCity}
                                    name="phone"
                                />
                            </Form.Item>
                            <Form.Item label="Địa chỉ cụ thể">
                                <Input
                                    size="large"
                                    readOnly
                                    defaultValue={st.address}
                                    name="address"
                                />
                            </Form.Item>
                            <Form.Item label="Thông tin mô tả bản thân">
                                <TextArea
                                    rows={3}
                                    readOnly
                                    defaultValue={st.moreInfo}
                                    name="moreInfo"
                                />
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
