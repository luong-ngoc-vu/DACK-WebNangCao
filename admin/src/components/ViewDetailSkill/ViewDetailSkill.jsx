import React from 'react';
import 'antd/dist/antd.css';
import './ViewDetailSkill.css';
import {Button, Form, Input, Typography} from 'antd';

const {Title} = Typography;


class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.name = '';
        this.msg = '';
    }

    render() {
        const st = this.props;
        if (st.checkUpdateSkill === true) {
            this.msg = 'Cập nhật kỹ năng thành công !';
        }
        this.name = st.name;
        return (
            <div>
                <Typography className="typo-data">
                    <div>
                        <Title level={4}>Chỉnh sửa thông tin của kỹ năng <b>{st.name}</b></Title>
                        <br/>
                        <Form
                            style={{padding: '0px 50px'}}
                            layout="vertical">
                            <Form.Item label="Tên kỹ năng">
                                <Input
                                    size="large"
                                    onChange={event => {
                                        this.name = event.target.value;
                                    }}
                                    name="name"
                                />
                            </Form.Item>
                            <Form.Item>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyItems: 'center',
                                        alignItems: 'center'
                                    }}
                                ><b>{this.msg}</b>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-sign-up"
                                    onClick={event => {
                                        event.preventDefault();
                                        st.updateSkill(st._id, this.name);
                                    }}
                                >
                                    Cập nhật
                                </Button>
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
