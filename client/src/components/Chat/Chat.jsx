import React, { Component } from 'react';

import 'antd/dist/antd.css';
import io from 'socket.io-client';
import ChatForm from './ChatForm/ChatForm';
import { connect } from 'react-redux';
import { Modal } from 'antd';

let socket;
const ENDPOINT = 'localhost:4000';
socket = io(ENDPOINT);
class Chat extends Component {
	render() {
		return <ChatForm dataRoom={this.props.email} />;
	}
}

const mapStateToProps = (state) => {
	return {
		email: state.LoginReducer.email
	};
};

export default connect(mapStateToProps, null)(Chat);
