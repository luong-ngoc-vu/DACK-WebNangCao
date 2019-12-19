import React from 'react';

import 'antd/dist/antd.css';
import './InteractForm.css';
import { Button, Form, Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';
import HireOrderContainer from '../../HireOrder/HireOrderContainer';
import Chat from '../../Chat/Chat';

class ContactForm extends React.Component {
  state = {
    loading: false,
    visibleContract: false,
    visibleChat: false
  };
  handleCancelContract = e => {
    console.log(e);
    this.setState({
      visibleContract: false
    });
  };
  handleCancelChat = e => {
    console.log(e);
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
    const { visibleContract, visibleChat, loading } = this.state;
    const st = this.props;
    return (
      <div className="side-form-contact">
        {st.isLogin === true && st.typeUser === 1 && (
          <Button
            size="large"
            type="primary"
            className="contact-button"
            onClick={this.showContract}
          >
            <Icon type="solution" />
            Thuê gia sư
          </Button>
        )}

        {st.isLogin === true && st.typeUser === 1 && (
          <Button
            size="large"
            type="primary"
            className="contact-button"
            onClick={this.showChat}
          >
            <Icon type="wechat" />
            Chat với gia sư
          </Button>
        )}

        {st.isLogin === true && st.typeUser === 1 && (
          <Button size="large" type="primary" className="contact-button">
            <Icon type="heart" /> Lưu
          </Button>
        )}
        {st.isLogin === false && (
          <Button size="large" type="primary" className="contact-button">
            <Link to="/login">
              <Icon type="heart" /> Login để thuê gia sư
            </Link>
          </Button>
        )}

        {/* show modal */}
        <Modal
          visible={visibleContract}
          style={{ top: 20, width: 600, minWidth: 600 }}
          title="Gửi yêu cầu thuê gia sư"
          onCancel={this.handleCancelContract}
          footer={null}
        >
          <HireOrderContainer />
        </Modal>

        <Modal
          title="Basic Modal"
          visible={visibleChat}
          onCancel={this.handleCancelChat}
          footer={null}
        >
          <Chat />
        </Modal>
      </div>
    );
  }
}

const Contact = Form.create({ name: 'contact_form' })(ContactForm);
export default Contact;
