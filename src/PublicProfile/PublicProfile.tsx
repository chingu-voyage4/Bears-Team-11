import * as React from 'react';
import Footer from '../Headers&Footers/Footer';
import ProfileDetails from './profileDetails';
import SkillLabel from './skillLabel';
import Projects from '../Project/Projects';
import HeaderContainer from '../Headers&Footers/HeaderContainer';
import { Store, UserProfileProps } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import '../styles/PublicProfile.css';

class PublicProfile extends React.Component<UserProfileProps, {}> {
  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="public-profile-container">
          <div className="public-profile-user-data">
            <img
              className="public-profile-image"
              src={require('../assets/blank image.png')}
            />
            <div className="public-profile-details">
              <ProfileDetails />
            </div>
            <div className="public-profile-skills">
              <SkillLabel />
            </div>
          </div>

          <div className="public-profile-projects">
            <h3>Projects</h3>
            <Projects arrayOfProjects={'projects'} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects
  };
}
export default connect(mapStateToProps, { getProjects })(PublicProfile);