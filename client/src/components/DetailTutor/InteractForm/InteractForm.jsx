import React from 'react';

import 'antd/dist/antd.css';
import './InteractForm.css';
import { Form, Icon, Button, Modal } from 'antd';
import HireOrder from '../../HireOrder/HireOrder';

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
    const { visible, loading } = this.state;
    return (
      <div className="side-form-contact">
        <Button
          size="large"
          type="primary"
          className="contact-button"
          onClick={this.showModal}
        >
          <Icon type="solution" />
          Thuê gia sư
        </Button>

        <Button size="large" type="primary" className="contact-button">
          <Icon type="wechat" />
          Chat với gia sư
        </Button>
        <Button size="large" type="primary" className="contact-button">
          <Icon type="heart" /> Lưu
        </Button>

        <HireOrder visible={visible} />
      </div>
    );
  }
}

const Contact = Form.create({ name: 'contact_form' })(ContactForm);
export default Contact;
