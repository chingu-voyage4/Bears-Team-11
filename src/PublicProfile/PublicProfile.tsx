import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ProfileImage from './profileImage';
import ProfileDetails from './profileDetails';
import SkillLabel from './skillLabel';
import Projects from '../Projects';
import './PublicProfile.css';

class PublicProfile extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <Header />
        </div>
        <div className="image">
          <ProfileImage />
        </div>
        <div className="details">
          <ProfileDetails />
        </div>
        <div className="skills">
          <SkillLabel />
        </div>

        <div className="projects">
          <h3>Projects</h3>
          <Projects count={2} />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default PublicProfile;
