import * as React from 'react';
import Footer from '../Footer/Footer';
import HeaderContainer from '../Header/HeaderContainer';
import { Store, UserProfileProps, Action } from '../types/Redux';
import { connect, Dispatch } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import '../styles/PublicProfile.css';
import RolesCheckmarks from './RolesCheckmarks';
import SkillLabel from './SkillLabel';
import UserProjects from './UserProjects';
import UserLinks from './UserLinks';

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
            <UserProjects projects={this.props.projects} />
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);
