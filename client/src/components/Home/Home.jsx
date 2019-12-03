import React from 'react';
import BannerBackground from './BannerBackground/BannerBackground';
import OutstandingTutorList from './OutstandingTutorList/OutstandingTutorList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <BannerBackground />
        <OutstandingTutorList />
      </div>
    );
  }
}

export default Home;
