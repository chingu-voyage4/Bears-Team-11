import * as React from 'react';
import '../styles/LoggedInHeader.css';
import { LoggedInHeaderState } from '../types/LoggedInHeader.d';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Store, LoggedInHeaderProps } from '../types/Redux';
import { logout } from '../actions/userActions';
import { getUserProjects } from '../actions/projectActions';

class LoggedInHeader extends React.Component<
  LoggedInHeaderProps,
  LoggedInHeaderState
> {
  constructor(props: LoggedInHeaderProps) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    this.props.getUserProjects(this.props.user.username);
  }

  public logout = () => {
    this.props.logout();
  };

  public toggleSettingsDropdown(e: React.MouseEvent<HTMLButtonElement>): void {
    var doc = e.currentTarget.nextElementSibling!;
    doc.classList.toggle('new-project-show');
  }

  render() {
    var activeProjects = this.props.userProjects;
    var links: any;

    if (activeProjects === undefined) {
      links = null;
    } else if (!Array.isArray(activeProjects)) {
      links = (
        <a
          className="header-project-portal-link"
          href={'/projects/' + activeProjects._id}
        >
          {activeProjects.name}
        </a>
      );
    } else {
      links = activeProjects.map((project: any, index: number) => {
        var linkTo = '/projects/' + project._id;
        return (
          <a className="header-project-portal-link" href={linkTo} key={index}>
            {project.name}
          </a>
        );
      });
    }
    class ProjectLinksDropdown extends React.Component<{}, {}> {
      render() {
        return (
          <div>
            {links}
            <Link
              className="header-project-portal-link top-border"
              to="/user/profile"
            >
              {'Public Profile'}
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="logged-in-container-blue">
        <div className="logged-in-header-container">
          <Link to="/" className="logged-in-header-logo">
            project match
          </Link>
          <div className="dropdown">
            <button className="dropbtn">Choose A Portal &#x25BC;</button>
            <div className="dropdown-content">
              <ProjectLinksDropdown />
            </div>
          </div>
          <div className="logged-in-header-container-right">
            <Link to="/projects/add" className="logged-in-header-createButton">
              CREATE NEW PROJECT
            </Link>
            <div className="logged-in-header-profileImageDiv">
              <button
                onClick={e => this.toggleSettingsDropdown(e)}
                className="logged-in-header-profileImageButton"
              >
                <img
                  className="profileImage"
                  src={
                    this.props.user.profileImage
                      ? this.props.user.profileImage
                      : require('../assets/blank image.png')
                  }
                />
              </button>
              <div className="headerOptionsDropdown" id="headerOptionsDropdwn">
                <Link className="headerOptionsDropdownText" to="/user/settings">
                  User Settings
                </Link>
                <div
                  className="headerOptionsDropdownText lineAbove"
                  onClick={this.logout}
                >
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logged-in-header-container-sub-1080">
          <Link to="/" className="logged-in-header-logo">
            project match
          </Link>
          <div className="dropdown">
            <button className="dropbtn">Choose A Portal &#x25BC;</button>
            <div className="dropdown-content">
              <ProjectLinksDropdown />
            </div>
          </div>
          <div className="logged-in-header-container-right">
            <div className="logged-in-header-profileImageDiv">
              <button
                onClick={e => this.toggleSettingsDropdown(e)}
                className="logged-in-header-profileImageButton"
              >
                <img
                  className="profileImage"
                  src={
                    this.props.user.profileImage
                      ? this.props.user.profileImage
                      : require('../assets/blank image.png')
                  }
                />
              </button>
              <div
                className="headerOptionsDropdown"
                id="headerOptionsDropdwn-sub1080"
              >
                <Link to="/projects/add" className="headerOptionsDropdownText">
                  Create New Project
                </Link>
                <Link className="headerOptionsDropdownText" to="/user/settings">
                  User Settings
                </Link>
                <div
                  className="headerOptionsDropdownText lineAbove"
                  onClick={this.logout}
                >
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logged-in-header-container-sub-725">
          <Link to="/" className="logged-in-header-logo">
            project match
          </Link>
          <div className="logged-in-header-container-right">
            <div className="logged-in-header-profileImageDiv">
              <button
                onClick={e => this.toggleSettingsDropdown(e)}
                className="logged-in-header-profileImageButton"
              >
                <img
                  className="profileImage"
                  src={
                    this.props.user.profileImage
                      ? this.props.user.profileImage
                      : require('../assets/blank image.png')
                  }
                />
              </button>
              <div
                className="headerOptionsDropdown"
                id="headerOptionsDropdwn-sub1080"
              >
                <Link to="/projects/add" className="headerOptionsDropdownText">
                  Create New Project
                </Link>
                <Link className="headerOptionsDropdownText" to="/user/settings">
                  User Settings
                </Link>
                <Link className="headerOptionsDropdownText" to="/user/profile">
                  {'Public Profile'}
                </Link>
                <div className="dropdown-content">
                  <div className="dropdown-content-title">Project Portals</div>
                  {links}
                </div>
                <div
                  className="headerOptionsDropdownText lineAbove"
                  onClick={this.logout}
                >
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects,
    userProjects: state.userProjects
  };
}

export default withRouter(connect(mapStateToProps, { logout, getUserProjects })(
  LoggedInHeader as any
) as any);
