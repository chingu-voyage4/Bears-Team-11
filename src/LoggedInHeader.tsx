import * as React from 'react';
import './styles/LoggedInHeader.css';
import { PassedProps, State, Props } from './types/LoggedInHeader.d';
import { Link } from 'react-router-dom';

class LoggedInHeader extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: ''
    };
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
            <button className="logged-in-header-profileImageButton">
              <img
                className="profileImage"
                src={require('./assets/blank image.png')}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoggedInHeader;
