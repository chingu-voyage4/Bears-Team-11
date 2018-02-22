import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import LandingImage from './LandingImage';
import ProjectMatch from './ProjectMatch';
import TeamCollaboration from './TeamCollaboration';
import RecentProjects from './RecentProjects';
import ReadyToTry from './ReadyToTry';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <LandingImage />
        <ProjectMatch />
        <TeamCollaboration />
        <RecentProjects />
        <ReadyToTry />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;