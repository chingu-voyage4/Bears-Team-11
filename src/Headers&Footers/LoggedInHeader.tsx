import * as React from 'react';
import './styles/LoggedInHeader.css';
import { LoggedInHeaderState } from '../types/LoggedInHeader.d';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Store, LoggedInHeaderProps } from '../types/Redux';
import { logout } from '../actions/userActions';

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

  public logout = () => {
    this.props.logout();
  };

  public toggleSettingsDropdown(e: React.MouseEvent<HTMLButtonElement>): void {
    var doc = document.getElementById('headerOptionsDropdwn')!;
    doc.classList.toggle('new-project-show');
  }

  render() {
    class ProjectLinksDropdown extends React.Component<
      { user: any; projects: any },
      {}
    > {
      render() {
        var listOfProjects = this.props.projects;
        var username = this.props.user.username;
        var activeProjects;
        var links;

        console.log(listOfProjects);
        if (listOfProjects === null || listOfProjects === undefined) {
          links = null;
        } else {
          activeProjects = listOfProjects.filter((project: any) => {
            if (
              project.creator === username ||
              (project.team!.indexOf(username) !== -1 &&
                project.status === true)
            ) {
              return project;
            } else {
              return null;
            }
          });
        }
        if (!Array.isArray(activeProjects)) {
          links = (
            <Link
              className="header-project-portal-link"
              to={'/projects/' + activeProjects._id}
            >
              {activeProjects.name}
            </Link>
          );
        } else {
          links = activeProjects.map((project: any, index: number) => {
            var linkTo = '/projects/' + project._id;
            return (
              <Link
                className="header-project-portal-link"
                to={linkTo}
                key={index}
              >
                {project.name}
              </Link>
            );
          });
        }

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
              <ProjectLinksDropdown
                projects={this.props.projects}
                user={this.props.user}
              />
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
                      : require('./assets/blank image.png')
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

export default connect(mapStateToProps, { logout })(LoggedInHeader);
