import * as React from 'react';
import { connect } from 'react-redux';
import HeaderContainer from '../Header/HeaderContainer';
import Footer from '../Footer/Footer';
import LandingImage from './LandingImage';
import ProjectFeatures from './ProjectFeatures';
import RecentProjects from './RecentProjects';
import ReadyToTry from './ReadyToTry';
import { LandingPageState } from '../types/LandingPage.d';
import { Store, LandingPageProps } from '../types/Redux';

class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  render() {
    return (
      <div>
        <HeaderContainer />
        <LandingImage />
        <ProjectFeatures />
        <RecentProjects />
        {Object.keys(this.props.user).length === 0 ? <ReadyToTry /> : null}
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
