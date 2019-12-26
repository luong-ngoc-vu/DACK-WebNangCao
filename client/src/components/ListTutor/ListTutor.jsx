import React from 'react';
import {Link} from 'react-router-dom';
import '../Home/OutstandingTutorList/OutstandingTutorList.css';
import 'antd/dist/antd.css';

import {Button, Card, Form, Input, List, Rate, Select, Tag, TreeSelect} from 'antd';
import {getProvinces} from 'sub-vn';
import numeral from 'numeral';

const {Search} = Input;

class ListTutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTutorialCity: [],
            dataTutorialSubject: [],
            dataSkills: [],
            dataTeacherSearch: [],
            provinceName: '',
            listTeacherByMoney: [],
            checkListTutorMoney: false,
            checkChooseCity: false,
            checkChooseSubject: false,
            checkSearchName: false,

            value: undefined
        };
    }

    onChangeSubject = (value) => {
        this.setState({value});
    };

    componentWillMount() {
        fetch('http://localhost:4000/user/getTutorialUser')
            .then((response) => response.json())
            .then((data) => this.setState({data: data}));
        fetch('http://localhost:4000/user/getSkills')
            .then((response) => response.json())
            .then((data) => this.setState({dataSkills: data}));
    }

    render() {
        const st = this.props;
        let data_tutorial = [];
        const {data, dataTutorialCity, dataSkills, dataTutorialSubject, dataTeacherSearch, listTeacherByMoney} = this.state;
        console.log(dataTutorialSubject);

        const treeData = dataSkills.map((item) => ({
            title: item.name,
            value: item.name,
            key: item.name,
            children: item.children.map((children) => ({
                title: children,
                value: children,
                key: children
            }))
        }));
        data_tutorial = data;
        if (this.state.checkChooseCity === true) data_tutorial = dataTutorialCity;
        else if (this.state.checkChooseSubject === true) data_tutorial = dataTutorialSubject;
        else if (this.state.checkSearchName === true) data_tutorial = dataTeacherSearch;
        else if (this.state.checkListTutorMoney === true) data_tutorial = listTeacherByMoney;
        return (
            <div className="out-tutor">
                <div className="filter-tutor">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                            width: '100%'
                        }}
                    >
                        <h2 style={{textAlign: 'left', margin: '5px 0px'}}>
                            <strong>Gia sư nổi bật</strong>
                        </h2>
                    </div>
                    <Form layout="inline" style={{marginBottom: 20}}>
                        <div style={{width: '100%', paddingLeft: 15}}>
                            <Form.Item label="Chọn tỉnh/ Thành phố">
                                <Select
                                    defaultValue={'all'}
                                    labelInValue
                                    onChange={(value) => {
                                        value.key === 'all'
                                            ? this.setState({checkChooseCity: false})
                                            : fetch(`http://localhost:4000/user/getTutorialCity/${value.label}`)
                                                .then((response) => response.json())
                                                .then((teachers) => {
                                                    this.setState({
                                                        dataTutorialCity: teachers,
                                                        provinceCode: value.key,
                                                        provinceName: value.label,
                                                        checkChooseCity: true
                                                    });
                                                })
                                                .catch((error) => {
                                                    return error;
                                                });
                                    }}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    style={{minWidth: 200}}
                                >
                                    <Select.Option value={'all'}>Tất cả địa điểm</Select.Option>
                                    {getProvinces().map((con) => (
                                        <Select.Option value={con.code}>{con.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Chọn môn học muốn thuê">
                                <TreeSelect
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    showSearch
                                    style={{minWidth: 200}}
                                    labelInValue
                                    value={this.state.value}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={treeData}
                                    placeholder="Please select"
                                    onChange={(value) => {
                                        this.onChangeSubject(value);
                                        console.log(value);
                                        fetch(`http://localhost:4000/user/getTeachesrBySkill/${value.value}`)
                                            .then((response) => response.json())
                                            .then((teachers) => {
                                                this.setState({
                                                    dataTutorialSubject: teachers,
                                                    checkChooseSubject: true
                                                });
                                            })
                                            .catch((error) => {
                                                return error;
                                            });
                                    }}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="Chọn khoảng giá thuê">
                                <Select
                                    key="price"
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Chọn khoảng giá"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={(value) => {
                                        this.onChangeSubject(value);
                                        fetch(`http://localhost:4000/user/getTeacherByMoneyPerHour/${value}`)
                                            .then((response) => response.json())
                                            .then((teachers) => {
                                                this.setState({
                                                    listTeacherByMoney: teachers,
                                                    checkListTutorMoney: true,
                                                });
                                            })
                                            .catch((error) => {
                                                return error;
                                            });
                                    }}
                                >
                                    <Select.Option value="1">100.000 đ - 300.000 đ</Select.Option>
                                    <Select.Option value="2">300.000 đ - 500.000 đ</Select.Option>
                                    <Select.Option value="3">500.000 đ - 1.000.000 đ</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Tìm gia sư theo tên">
                                <Search
                                    key="name"
                                    placeholder="Tìm kiếm gia sư"
                                    onSearch={value => {
                                        fetch(`http://localhost:4000/user/getTeacherByName/${value}`)
                                            .then(response => response.json())
                                            .then(data => this.setState({
                                                dataTeacherSearch: data,
                                                checkSearchName: true
                                            }));
                                    }}
                                    enterButton
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className="out-tutor__list">
                    <List
                        grid={{gutter: 16, column: 4}}
                        pagination={{pageSize: 8}}
                        dataSource={data_tutorial}
                        renderItem={(teacher) => (
                            <List.Item>
                                <Link
                                    to={'detailTutor/' + teacher._id}
                                    size="large"
                                    onClick={(event) => {
                                        st.viewDetailTutor(teacher._id);
                                    }}
                                >
                                    <Card
                                        style={{minHeight: 400, minWidth: 250}}
                                        hoverable="true"
                                        className="card-tutor"
                                        cover={
                                            <img
                                                style={{width: '100%', maxHeight: 150, border: '0'}}
                                                alt="example"
                                                src={teacher.image}
                                            />
                                        }
                                        actions={[
                                            <Button type="primary" className="btn-view-detail">
                                                Xem chi tiết
                                            </Button>
                                        ]}
                                    >
                                        <div className="info-tutor">
                                            <p
                                                style={{
                                                    fontWeight: 'bolder',
                                                    color: '#008039',
                                                    fontSize: 15,
                                                    width: '100%'
                                                }}
                                            >
                                                {teacher.name}
                                            </p>
                                            <Rate disabled defaultValue={teacher.averagePoint}/>
                                            <p>
                                                Địa chỉ: <strong>{teacher.provinceName}</strong>
                                            </p>
                                            <p>
                                                Học phí:{' '}
                                                <span style={{fontWeight: 'bolder'}}>
													{numeral(teacher.money).format('0,0')} vnđ
												</span>/<strong>h</strong>
                                            </p>
                                        </div>
                                        <hr style={{border: '1px solid #e0e0e0'}}/>
                                        <div>
                                            {teacher.skills.map((skill) => (
                                                <Tag style={{fontWeight: 'bold', marginBottom: 5}}>{skill}</Tag>
                                            ))}
                                        </div>
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default ListTutor;
