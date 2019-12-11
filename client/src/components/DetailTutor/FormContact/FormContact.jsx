import React from 'react';

import 'antd/dist/antd.css';
import './FormContact.css';
import { Form, Icon, Button } from 'antd';

class ContactForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    return (
      <div className="side-form-contact">
        <Button size="large" type="primary" className="contact-button">
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
      </div>
    );
  }
}

const Contact = Form.create({ name: 'contact_form' })(ContactForm);
export default Contact;
