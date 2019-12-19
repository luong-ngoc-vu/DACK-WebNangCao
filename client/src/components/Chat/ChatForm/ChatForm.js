import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';
import { withRouter } from 'react-router-dom'
import './Chat.css'
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

let socket;
const ENDPOINT = 'localhost:4000';
socket = io(ENDPOINT);
const ChatForm = (props) => {
    const { dataRoom, target } = props;         //Target là email người mình muốn chat(người dạy)
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = { name: dataRoom, room: target };

        setName(name);
        setRoom(room);

        socket.emit('join', { name: name, room: room }, (error) => {
            if (error) {
                alert('Chào mừng bạn quay lại cuộc trò chuyện');
            }
        });

    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    //sending messages
    const sendMessage = (event) => {

        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () =>
                setMessage(''));
        }
    }


    console.log(messages)


    return (
        <div className="outerContainer">
            <div className="container">

                <InfoBar room={room} />
                {/* <input value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null
                    }
                /> */}
                <Messages messages={messages} name={name} />
                <Input message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage} />
            </div>

        </div>
    )
}


export default withRouter(ChatForm);