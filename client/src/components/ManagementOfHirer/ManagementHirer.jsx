import React from 'react';

import {Layout} from 'antd';
import ProfileHirerContainer from './ProfileHirer/ProfileHirerContainer';
import SideBarHirer from './SideBarHirer/SideBarHirer';

const {Content} = Layout;

class ManagementHirer extends React.Component {
    render() {
        return (
            <div>
                <Layout style={{padding: '15px 0px'}}>
                    <SideBarHirer/>
                    <Content
                        style={{
                            padding: '0 0px',
                            minHeight: 280,
                            background: '#fff',
                            marginLeft: '10px',
                            boxShadow: '0px 1px 6px 0px rgba(57, 73, 76, 0.35)'
                        }}
                    >
                        <ProfileHirerContainer/>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default ManagementHirer;
