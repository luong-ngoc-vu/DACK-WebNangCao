import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';


class Messages extends React.Component {
    state = {
        messages: [],
    }

    componentDidMount() {
        fetch(`http://localhost:4000/message/getAll/${this.props.mailTeacher}/${this.props.mailStudent}/${50}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ messages: data });
            })
            .catch((error) => {
                return error;
            });
    }
    render() {
        const { messages } = this.state;
        return (
            <div>
                < ScrollToBottom className="messages" >
                    {messages.map((message, i) => <div key={i}><Message message={message} name={this.props.mailTeacher} /></div>)}
                </ScrollToBottom >
            </div>
        );
    }
}

export default Messages;
