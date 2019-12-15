import React, { Component } from 'react'

import 'antd/dist/antd.css'

import { Table, Divider, Tag, Button, Icon } from 'antd';

const columns = [
  {
    title: 'Tên gia sư',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="primary" icon="edit" />
        <Divider type="vertical" />
        <Button type="danger" icon="delete"/>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    date: '11/12/2019',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    date: '11/12/2019',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    date: '11/12/2019',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class OrderContract extends React.PureComponent {
    render() {
        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}
export default OrderContract;