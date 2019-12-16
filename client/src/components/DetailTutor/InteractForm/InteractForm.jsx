import React from 'react';

import 'antd/dist/antd.css';
import './InteractForm.css';
import {Button, Form, Icon} from 'antd';
import {Link} from "react-router-dom";
import HireOrderContainer from '../../HireOrder/HireOrderContainer';

class ContactForm extends React.Component {
    state = {
        loading: false,
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    render() {
        const {visible, loading} = this.state;
        const st = this.props;
        return (
            <div className="side-form-contact">
                {st.isLogin === true && st.typeUser === 1 && (
                    <Button
                        size="large"
                        type="primary"
                        className="contact-button"
                        onClick={this.showModal}
                    >
                        <Icon type="solution"/>
                        Thuê gia sư
                    </Button>
                )}

                {st.isLogin === true && st.typeUser === 1 && (
                    <Button size="large" type="primary" className="contact-button">
                        <Icon type="wechat"/>
                        Chat với gia sư
                    </Button>
                )}

                {st.isLogin === true && st.typeUser === 1 && (
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
                <HireOrderContainer visible={visible}/>
            </div>
        );
    }
}

const Contact = Form.create({name: 'contact_form'})(ContactForm);
export default Contact;
