import React, {Component} from 'react';

import 'antd/dist/antd.css';
import io from 'socket.io-client';
import ChatForm from './ChatForm/ChatForm';
import {connect} from 'react-redux';

let socket;
const ENDPOINT = 'localhost:4000';
socket = io(ENDPOINT);

class Chat extends Component {
    render() {
        console.log(this.props.emailTutor);
        const {typeUser} = this.props;
        //TODO: thêm vào dataRoom 1 props chứa email của user mình muốn chat
        //ChatForm dataRoom={this.props.email, this.props.targetUser}
        return (
            <ChatForm
                dataRoom={this.props.email}
                target={typeUser === 1 ? this.props.emailTutor : this.props.emailHirer}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.LoginReducer.email,
        typeUser: state.LoginReducer.typeUser
    };
};

export default connect(mapStateToProps, null)(Chat);
