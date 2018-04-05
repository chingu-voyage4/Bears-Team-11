import * as React from 'react';
import { connect } from 'react-redux';
import HeaderContainer from '../HeaderContainer';
import Footer from '../Footer';
import LandingImage from './LandingImage';
import ProjectFeatures from './ProjectFeatures';
import RecentProjects from './RecentProjects';
import ReadyToTry from './ReadyToTry';
import { LandingPageProps } from '../types/LandingPage.d';
import { Store, State } from '../types/Redux';

class LandingPage extends React.Component<LandingPageProps, State> {
  render() {
    // let isUserLoggedIn = false;
    // if (this.props.user.email) {
    // isUserLoggedIn = true;
    // }
    return (
      <div>
        <HeaderContainer />
        <LandingImage />
        <ProjectFeatures />
        <RecentProjects />
        <ReadyToTry />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(LandingPage);
