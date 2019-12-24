import React from 'react';

import 'antd/dist/antd.css';
import './InteractForm.css';
import {Button, Form, Icon, Modal} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HireOrderContainer from '../../HireOrder/HireOrderContainer';
import Chat from '../../Chat/Chat';

class ContactForm extends React.Component {
    state = {
        loading: false,
        visibleContract: false,
        visibleChat: false
    };
    handleCancelContract = (e) => {
        this.setState({
            visibleContract: false
        });
    };
    handleCancelChat = (e) => {
        this.setState({
            visibleChat: false
        });
    };
    showContract = () => {
        this.setState({
            visibleContract: true
        });
    };
    showChat = () => {
        this.setState({
            visibleChat: true
        });
    };

    render() {
        const {visibleContract, visibleChat, loading} = this.state;
        const st = this.props;
        const {hiringPending} = this.props;
        return (
            <div className="side-form-contact">
                {st.isLogin === true &&
                st.typeUser === 1 && (hiringPending === 3 || hiringPending === 2) && (
                    <Button size="large" type="primary" className="contact-button" onClick={this.showContract}>
                        <Icon type="solution"/>
                        Thuê gia sư
                    </Button>
                )}

                {st.isLogin === true &&
                st.typeUser === 1 && hiringPending === -2 && (
                    <Button size="large" type="default" className="contact-button" onClick={this.showContract}>
                        <Icon type="solution"/>
                        Khiếu nại
                    </Button>
                )}

                {st.isLogin === true &&
                st.typeUser === 1 && hiringPending === 0 && (
                    <Button size="large" type="default" className="contact-button">
                        <Icon type="solution"/>
                        Chờ gia sư xác nhận
                    </Button>
                )}

                {st.isLogin === true &&
                st.typeUser === 1 && hiringPending === 1 && (
                    <Button size="large" type="default" className="contact-button">
                        <Icon type="solution"/>
                        Đang thuê
                    </Button>
                )}

                {st.isLogin === true &&
                st.typeUser === 1 && (
                    <Button size="large" type="primary" className="contact-button" onClick={this.showChat}>
                        <Icon type="wechat"/>
                        Chat với gia sư
                    </Button>
                )}

                {st.isLogin === true &&
                st.typeUser === 1 && (
                    <Button size="large" type="primary" className="contact-button">
                        <Icon type="heart"/> Lưu
                    </Button>
                )}
                {st.isLogin === false && (
                    <Button size="large" type="primary" className="contact-button">
                        <Link to="/login">
                            <Icon type="heart"/> Login để thuê gia sư
                        </Link>
                    </Button>
                )}

                {/* show modal */}
                <Modal
                    visible={visibleContract}
                    style={{top: 20, width: 600, minWidth: 600}}
                    title="Gửi yêu cầu thuê gia sư"
                    onCancel={this.handleCancelContract}
                    footer={null}
                >
                    <HireOrderContainer/>
                </Modal>

                <Modal title="Basic Modal" visible={visibleChat} onCancel={this.handleCancelChat} footer={null}>
                    <Chat emailTutor={this.props.emailTutor}/>
                </Modal>
            </div>
        );
    }
}

const InteractForm = Form.create({name: 'contact_form'})(ContactForm);
const mapStateToProps = (st) => {
    return {
        isLogin: st.LoginReducer.isLogin,
        typeUser: st.LoginReducer.typeUser,
        isSent: st.OrderReducer.isSent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractForm);
