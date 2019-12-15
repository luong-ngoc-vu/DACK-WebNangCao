import React, { Component } from 'react'

import 'antd/dist/antd.css';

import { List, Avatar, Icon, Button, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';

class OrderContract extends Component {

    render() {
        const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Bùi Tuấn Vũ ${i}`,
    position:`Sinh viên`,
    date: `20/12/2019`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}


        return (
            <div>
                <List style={{minHeight: 350}}
                    size="large"
                    pagination={{
                      onChange: page => {
                        console.log(page);
                      },
                      pageSize: 3,
                    }}
        className="demo-loadmore-list"
        
        itemLayout="horizontal"
       
        dataSource={listData}
        renderItem={item => (
          <List.Item
            actions={[<Button icon="edit" type="primary" key="list-loadmore-edit"/>, <Button icon="delete" type="danger" key="list-loadmore-edit"/>]}
          >
           
              <List.Item.Meta
                avatar={
                  <Avatar size="large" style={{minHeight: 50, minWidth: 50}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
              title={<div style={{width:'100%', position:'relative'}}><Link style={{position:'absolute', left:0}} to="#">{item.title} <Divider type="vertical" /> {item.position}</Link></div>}
              description={
                <div>
                  
                  </div>
                }
              />
              <div><Tag color="#2db7f5">Chờ xác nhận</Tag></div>
            
          </List.Item>
        )}
      />
            </div>
        );
    }
}
export default OrderContract;
