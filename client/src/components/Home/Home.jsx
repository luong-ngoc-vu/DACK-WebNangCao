import React from 'react';
import BannerBackground from './BannerBackground/BannerBackground';
import OutstandingTutorListContainer from './OutstandingTutorList/OutstandingTutorListContainer';

class Home extends React.Component {
    render() {
        return (
            <div>
                <BannerBackground/>
                <OutstandingTutorListContainer/>
            </div>
        );
    }
}

export default Home;
