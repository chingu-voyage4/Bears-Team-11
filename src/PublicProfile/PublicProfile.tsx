import * as React from 'react';
import Footer from '../Headers&Footers/Footer';
import Projects from '../Project/Projects';
import HeaderContainer from '../Headers&Footers/HeaderContainer';
import { Store, UserProfileProps } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import '../styles/PublicProfile.css';

class PublicProfile extends React.Component<UserProfileProps, {}> {
  componentDidMount() {
    this.props.getProjects(
      { createdAt: -1 },
      {
        $or: [
          { creator: this.props.user.username },
          { team: { $in: [this.props.user.username] } }
        ]
      }
    );
  }
  render() {
    class SkillLabel extends React.Component<{ skills: any }, {}> {
      render() {
        var skills = this.props.skills;
        var renderedSkills;
        if (skills === undefined || skills.length === 0) {
          renderedSkills = null;
        } else {
          renderedSkills = skills.map((skill: string, index: number) => {
            return (
              <div className="public-profile-skill" key={'skill_' + index}>
                {skill}
              </div>
            );
          });
        }
        return (
          <div className="public-profile-skill-container">{renderedSkills}</div>
        );
      }
    }
    return (
      <div>
        <HeaderContainer />
        <div className="public-profile-container">
          <div className="public-profile-user-data">
            <img
              className="public-profile-image"
              src={
                this.props.user.profileImage
                  ? this.props.user.profileImage
                  : require('../assets/blank image.png')
              }
            />
            <div className="public-profile-details">
              <div>{this.props.user.username}</div>
              <div>{this.props.user.location}</div>
              <div>{this.props.user.description}</div>
              <div>{this.props.user.roles}</div>
            </div>
            <div className="public-profile-skills">
              <SkillLabel skills={this.props.user.techstack} />
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
