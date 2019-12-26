import React from 'react';
import 'antd/dist/antd.css';
import {Avatar, Button, Form, Input, InputNumber, Layout, Typography} from 'antd';
import Redirect from 'react-router-dom/Redirect';
import '../ManagementOfHirer/ProfileHirer/ProfileHirer.css';
import {connect} from "react-redux";

const {Content} = Layout;
const {Title} = Typography;

class MoneyManagementForm extends React.Component {
    constructor() {
        super();
        this.err = '';
    }

    state = {
        loading: false,
        dataUser: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    componentDidMount() {
        const {id} = this.props;
        fetch(`https://apiclientwebsitethuegiasu.herokuapp.com/user/getUserById/${id}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({dataUser: data});
            })
            .catch((error) => {
                return error;
            });
    }

    render() {
        const {isLogin, name, image, curMoney, id} = this.props;
        const {dataUser} = this.state;
        if (isLogin === false) {
            return <Redirect to="/login"/>;
        }
        return (
            <div>
                <Content
                    style={{
                        padding: '0 0px',
                        minHeight: 280,
                        background: '#fff',

                        boxShadow: '0px 1px 6px 0px rgba(57, 73, 76, 0.35)'
                    }}
                >
                    <Typography className="typo-data">
                        <div>
                            <Title level={4}>Cập nhật số tiền hiện có</Title>
                            <br/>
                            <Avatar size={150} src={image}/>
                            <Form
                                style={{padding: '0px 50px'}}
                                layout="vertical"
                                onSubmit={this.handleSubmit}
                            >
                                <Form.Item label="Họ và tên">
                                    <Input
                                        size="large"
                                        value={name}
                                    />
                                </Form.Item>
                                <Form.Item label="Số tiền hiện tại">
                                    <InputNumber
                                        size="large"
                                        readOnly
                                        style={{width: '100%'}}
                                        value={dataUser.curMoney}
                                        min={50000}
                                        step={10000}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                                <Form.Item label={<span>Số tiền mới&nbsp;</span>}>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        defaultValue={dataUser.curMoney}
                                        min={50000}
                                        onChange={(event) => {
                                            this.curMoney = event.valueOf();
                                        }}
                                        step={10000}
                                        size="large"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                                <div>{this.err}</div>
                                <Form.Item
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Button
                                        style={{width: '150px', margin: '10px 300px'}}
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        className="btn-sign-up"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            fetch(`https://apiclientwebsitethuegiasu.herokuapp.com/user/updateCurMoney/${id}/${this.curMoney}`,
                                                {method: 'PUT'})
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    console.log(data);
                                                })
                                                .catch((error) => {
                                                    return error;
                                                });
                                            this.err = 'Cập nhật số tiền thành công !';
                                        }}
                                    >
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Typography>
                </Content>
            </div>
        );
    }
}

const MoneyManagement = Form.create({name: 'profile_form'})(MoneyManagementForm);

const mapStateToProps = (state) => ({
    curMoney: state.LoginReducer.curMoney,
    image: state.LoginReducer.image,
    name: state.LoginReducer.name,
    id: state.LoginReducer.idUser
});
export default connect(mapStateToProps, null)(MoneyManagement);
