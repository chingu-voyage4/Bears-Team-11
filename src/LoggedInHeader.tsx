import * as React from 'react';
import './styles/LoggedInHeader.css';
import {
  LoggedInHeaderProps,
  LoggedInHeaderState
} from './types/LoggedInHeader.d';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Store } from './types/Redux';

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
    // log out function
  };

  public toggleSettingsDropdown(e: React.MouseEvent<HTMLButtonElement>): void {
    var doc = document.getElementById('headerOptionsDropdwn')!;
    doc.classList.toggle('new-project-show');
  }

  render() {
    return (
      <div>
        <div className="logged-in-header-container">
          <Link to="/" className="logged-in-header-logo">
            project match
          </Link>
          <div className="logged-in-header-create">
            <Link to="/projects/add" className="logged-in-header-createButton">
              CREATE NEW PROJECT
            </Link>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Choose A Portal &#x25BC;</button>
            <div className="dropdown-content">
              <Link to="/">Test Project #1</Link>
              <Link to="/">Test Project #2</Link>
              <Link to="/user/profile" className="dropdown-profileLink">
                User Profile
              </Link>
            </div>
          </div>
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
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {})(LoggedInHeader);
