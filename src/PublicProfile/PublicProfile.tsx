import * as React from 'react';
import Footer from '../Footer';
import ProfileDetails from './profileDetails';
import SkillLabel from './skillLabel';
import Projects from '../Projects';
import HeaderContainer from '../HeaderContainer';
import { Store, UserProfileProps } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import './PublicProfile.css';

class PublicProfile extends React.Component<UserProfileProps, {}> {
  render() {
    return (
      <div className="container">
        <HeaderContainer />
        <div className="image">
          <img src={require('../assets/person-placeholder.jpg')} />
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
