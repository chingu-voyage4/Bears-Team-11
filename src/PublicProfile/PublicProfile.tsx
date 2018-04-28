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
        <div className="container">
          <div className="image">
            <img src={require('../assets/blank image.png')} />
          </div>
          <div className="details">
            <ProfileDetails />
          </div>
          <div className="skills">
            <SkillLabel />
          </div>

          <div className="projects">
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
