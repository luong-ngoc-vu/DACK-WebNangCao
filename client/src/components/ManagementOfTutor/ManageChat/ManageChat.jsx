import React, {Component} from 'react';
import 'antd/dist/antd.css';

import axios from 'axios';
import {Avatar, List, Modal, Typography} from 'antd';
import {Link} from 'react-router-dom';
import Chat from '../../Chat/Chat';

const {Text} = Typography;

class ManageChat extends Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        visible: false,
        recentHirer: ''
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    componentDidMount() {
        const tar = 'teacher7@gmail.com';
        axios.get(`http://localhost:4000/message/getUnread/${tar}`).then(res => {
            this.setState({list: res.data});
        });
    }

    render() {
        const {initLoading, loading, list} = this.state;
        return (
            <div>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            onClick={() => {
                                this.showModal();
                                this.setState({recentHirer: item.user});
                            }}
                            style={{padding: '10px 20px'}}
                            actions={[<Link key="list-loadmore-edit">Trả lời</Link>]}
                        >
                            <List.Item.Meta
                                style={{float: 'left'}}
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                }
                                title={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start'
                                        }}
                                        href="https://ant.design"
                                    >
                                        <Link>
                                            <Text strong> {item.user}</Text>
                                        </Link>
                                        <Link>{item.user}</Link>
                                    </div>
                                }
                            />
                            <div style={{float: 'left'}}>{item.text}</div>
                        </List.Item>
                    )}
                />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Chat emailHirer={this.state.recentHirer}/>
                </Modal>
            </div>
        );
    }
}

export default ManageChat;
