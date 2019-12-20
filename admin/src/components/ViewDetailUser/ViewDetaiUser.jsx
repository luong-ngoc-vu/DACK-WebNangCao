import React from 'react';
import 'antd/dist/antd.css';
import './ViewDetailUser.css';
import {Button, Form, Input, Typography} from 'antd';
import {Link, Redirect} from 'react-router-dom';

const {TextArea} = Input;

const {Title} = Typography;

class ProfileForm extends React.Component {
    render() {
        const st = this.props;
        if (st.isLogin === false) {
            return <Redirect to="/admin-login"/>;
        }
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Link to="/admin-normal/home">
                    <Button type="default" icon="arrow-left"/>
                </Link>
                <Typography style={{padding: '0px 100px 10px 50px', width: '100%'}} className="typo-data">
                    <div>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <Title level={4}>
                                Xem thông tin chi tiết thông tin <b>{st.name}</b>
                            </Title>
                            {/* <Link style={{ position: 'absolute', right: 0 }}>
								<Button type="primary" icon="edit" />
							</Link> */}
                        </div>
                        <br/>
                        <Form layout="vertical">
                            <Form.Item label="Địa chỉ email">
                                <Input size="large" value={st.email} name="email"/>
                            </Form.Item>
                            <Form.Item label="Tên đầy đủ">
                                <Input size="large" readOnly value={st.name} name="name"/>
                            </Form.Item>
                            <Form.Item label="Số điện thoại">
                                <Input size="large" readOnly value={st.phone} name="phone"/>
                            </Form.Item>
                            {st.typeUser === 1 && (
                                <Form.Item label="Loại tài khoản">
                                    <Input size="large" readOnly defaultValue="Học viên" name="phone"/>
                                </Form.Item>
                            )}
                            {st.typeUser === 2 && (
                                <Form.Item label="Loại tài khoản">
                                    <Input size="large" readOnly defaultValue="Giáo viên" name="phone"/>
                                </Form.Item>
                            )}
                            <Form.Item label="Tỉnh/ Thành phố">
                                <Input size="large" readOnly value={st.provinceName} name="provinceName"/>
                            </Form.Item>
                            <Form.Item label="Quận/ Huyện">
                                <Input size="large" readOnly value={st.districtName} name="districtName"/>
                            </Form.Item>
                            <Form.Item label="Phường/ Xã">
                                <Input size="large" readOnly value={st.wardName} name="wardName"/>
                            </Form.Item>
                            <Form.Item label="Địa chỉ cụ thể">
                                <Input size="large" readOnly value={st.address} name="address"/>
                            </Form.Item>
                            <Form.Item label="Thông tin mô tả bản thân">
                                <TextArea rows={3} readOnly value={st.moreInfo} name="moreInfo"/>
                            </Form.Item>
                        </Form>
                    </div>
                </Typography>
            </div>
        );
    }
}

const ProfileHirer = Form.create({name: 'profile_form'})(ProfileForm);
export default ProfileHirer;
