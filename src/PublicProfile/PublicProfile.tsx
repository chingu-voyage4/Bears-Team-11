import * as React from 'react';
import Footer from '../Headers&Footers/Footer';
import HeaderContainer from '../Headers&Footers/HeaderContainer';
import { Store, UserProfileProps } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import '../styles/PublicProfile.css';
import ProjectForPublicProfile from '../Project/ProjectForPublicProfile';

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
    class UserLinks extends React.Component<{ user: any }, {}> {
      render() {
        var user = this.props.user;
        var renderedLinks;
        var imageLinks = {
          linkedInLink: require('../assets/icons8-linkedin-48.png'),
          githubLink: require('../assets/icons8-github-50.png'),
          portfolioLink: require('../assets/icons8-business-filled-50.png'),
          websiteLink: require('../assets/icons8-globe-26.png'),
          twitterLink: require('../assets/icons8-twitter-filled-50.png'),
          blogLink: require('../assets/icons8-comments-32.png')
        };
        var linkNames = [
          'linkedInLink',
          'githubLink',
          'portfolioLink',
          'websiteLink',
          'twitterLink',
          'blogLink'
        ];
        renderedLinks = linkNames.map((link: string) => {
          if (user[link] !== '') {
            return (
              <a href={user[link]}>
                <img
                  className="public-profile-link-icons"
                  src={imageLinks[link]}
                />
              </a>
            );
          } else {
            return null;
          }
        });

        return (
          <div className="public-profile-links-container">
            <div className="public-profile-header">Links</div>
            {renderedLinks}
          </div>
        );
      }
    }
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
          <div className="public-profile-skill-container">
            <div className="public-profile-header">Skills</div>
            {renderedSkills}
          </div>
        );
      }
    }

    class RolesCheckmarks extends React.Component<{ roles: any }, {}> {
      render() {
        var userRoles = this.props.roles;
        var roles;
        if (userRoles === undefined) {
          roles = null;
        } else {
          roles = userRoles.map((role: any, index: number) => {
            return (
              <div key={'roles_' + index} className="public-profile-roles">
                <div className="checkmark-roles">
                  <div className="checkmark_stem" />
                  <div className="checkmark_kick" />
                </div>
                <div className="public-profile-roles-text">{role}</div>
              </div>
            );
          });
        }
        return <div className="public-profile-roles-container">{roles}</div>;
      }
    }

    var renderedProjects;
    var projects: any = this.props.projects;
    if (projects === undefined || projects.length === 0) {
      renderedProjects = null;
    } else if (projects.length === 1) {
      renderedProjects = (
        <ProjectForPublicProfile projId={projects[0]._id} data={projects[0]} />
      );
    } else {
      renderedProjects = projects.map((project: any, index: number) => {
        return (
          <ProjectForPublicProfile
            key={'projects_Edit_' + index}
            projId={project._id}
            data={project}
          />
        );
      });
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
              <div className="public-profile-details-text details-bold">
                {this.props.user.username}
              </div>
              <div className="public-profile-details-text details-location">
                {this.props.user.location}
              </div>
              <RolesCheckmarks roles={this.props.user.roles} />
              <br />
              <div className="public-profile-details-text">
                {this.props.user.description}
              </div>
            </div>
            <SkillLabel skills={this.props.user.techstack} />
            <UserLinks user={this.props.user} />
          </div>

          <div className="public-profile-projects">
            <div className="public-profile-header">Projects</div>
            {renderedProjects}
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
