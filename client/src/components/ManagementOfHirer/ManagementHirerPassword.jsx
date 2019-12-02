import React from 'react';

import {Layout} from 'antd';
import ChangePasswordContainer from '../ChangePassword/ChangePasswordContainer';
import SideBarHirer from './SideBarHirer/SideBarHirer';

const {Content} = Layout;

class ManagementHirerPassword extends React.Component {
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
                        <ChangePasswordContainer/>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default ManagementHirerPassword;
