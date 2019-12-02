import React from 'react';
import {Layout} from 'antd';

import ProfileTutorContainer from './ProfileTutor/ProfileTutorContainer';
import SideBarTutor from './SideBarTutor/SideBarTutor';

const {Content} = Layout;

class ManagementTutor extends React.Component {
    render() {
        return (
            <div>
                <Layout style={{padding: '15px 0px'}}>
                    <SideBarTutor/>
                    <Content
                        style={{
                            padding: '0 0px',
                            minHeight: 280,
                            background: '#fff',
                            marginLeft: '10px',
                            boxShadow: '0px 1px 6px 0px rgba(57, 73, 76, 0.35)'
                        }}
                    >
                        <ProfileTutorContainer/>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default ManagementTutor;
