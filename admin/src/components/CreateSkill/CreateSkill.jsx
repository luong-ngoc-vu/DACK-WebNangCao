import React from 'react';

import 'antd/dist/antd.css';
import './CreateSkill.css';
import {Button, Form, Input, Select, Typography} from 'antd';

const {Option} = Select;

class CreateSkillForm extends React.Component {
    constructor() {
        super();
        this.title = '';
        this.sub = '';
        this.err = '';
    }

    state = {
        confirmDirty: false,
        typeUser: 1,
        autoCompleteResult: [],
        dataSkillName: [],
        dataChildrenBySkillName: [""],
        selectedNameSkill: '',
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    componentDidMount() {
        fetch(`https://apiadminthuegiasu.herokuapp.com/admin/skills`)
            .then((response) => response.json())
            .then((data) => {
                    this.setState({dataSkillName: data})
                }
            )
            .catch((error) => {
                return error;
            });
    }

    render() {
        const st = this.props;
        const {dataSkillName, selectedNameSkill, dataChildrenBySkillName} = this.state;
        if (st.isCreateSkill === 'err') {
            this.err = 'Có lỗi trong quá trình xử lý, vui lòng thử lại !';
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Typography>
                    <div>
                        <Form layout="vertical" onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>
                            <Form.Item label="Chọn tab kỹ năng">
                                <Select
                                    showSearch
                                    style={{width: '100%'}}
                                    placeholder="Tab kỹ năng"
                                    optionFilterProp="children"
                                    autoFocus
                                    onChange={value => {
                                        this.setState({selectedNameSkill: value});
                                        fetch(`https://apiadminthuegiasu.herokuapp.com/admin/getASkillByName/${value}`)
                                            .then((response) => response.json())
                                            .then((data) => {
                                                    this.setState({dataChildrenBySkillName: data.children})
                                                }
                                            )
                                            .catch((error) => {
                                                return error;
                                            });
                                    }}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {dataSkillName.map(item =>
                                        <Option value={item.name}>{item.name}</Option>
                                    )}
                                    <Option value={"None"}>{"None"}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label={"Các kỹ năng trong " + selectedNameSkill}>
                                <Select
                                    showSearch
                                    style={{width: '100%'}}
                                    placeholder="Tab kỹ năng"
                                    optionFilterProp="children"
                                    autoFocus
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {dataChildrenBySkillName.map(item =>
                                        <Option value={item}>{item}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Nhập tên Title">
                                <Input
                                    size="large"
                                    placeholder="Nhập tên tab kỹ năng"
                                    onChange={(event) => {
                                        this.title = event.target.value;
                                    }}
                                    name="name"
                                />
                            </Form.Item>
                            <Form.Item label="Nhập tên kỹ năng">
                                {getFieldDecorator('fullname', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên kỹ năng'
                                        }
                                    ]
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Nhập tên kỹ năng"
                                        onChange={(event) => {
                                            this.sub = event.target.value;
                                        }}
                                        name="name"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyItems: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <b>{this.err}</b>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-sign-up"
                                    onClick={(event) => {
                                        if (selectedNameSkill === "None") {
                                            fetch('https://apiadminthuegiasu.herokuapp.com/admin/createSkillV3', {
                                                method: 'POST',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({name: this.title, content: this.sub})
                                            }).then(value => value.json()).then(data => {
                                                console.log(data)
                                            }).catch(error => {
                                            });
                                        } else {
                                            fetch('https://apiadminthuegiasu.herokuapp.com/admin/createSkillV2', {
                                                method: 'PUT',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({name: selectedNameSkill, content: this.sub})
                                            }).then(value => value.json()).then(data => {
                                                console.log(data)
                                            }).catch(error => {
                                            });
                                        }
                                        this.err = 'Tạo mới Skill thành công !';
                                    }}
                                >
                                    Tạo kỹ năng
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Typography>
            </div>
        );
    }
}

const CreateSkill = Form.create({name: 'normal_Register'})(CreateSkillForm);
export default CreateSkill;
