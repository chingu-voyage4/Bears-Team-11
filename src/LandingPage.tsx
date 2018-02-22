import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import LandingImage from './LandingImage';
import ProjectMatch from './ProjectMatch';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <LandingImage />
        <ProjectMatch />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;