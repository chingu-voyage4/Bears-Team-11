import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LandingImage from './LandingImage';
import ProjectFeatures from './ProjectFeatures';
import RecentProjects from './RecentProjects';
import ReadyToTry from './ReadyToTry';
import LoggedInHeader from '../LoggedInHeader';
import SettingsPage from '../SettingsPage';
// import RecentProjects from './RecentProjects';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <LoggedInHeader />
        <Header />
        <SettingsPage />
        <LandingImage />
        <ProjectFeatures />
        <RecentProjects />
        <ReadyToTry />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
