import * as React from 'react';
import './styles/SettingsPage.css';
import { PassedProps, State, Props } from './types/SettingsPage.d';
import PublicProfile from './PublicProfile';
import PersonalDetails from './PersonalDetails';

class SettingsPage extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      personal: false,
      public: true
    };
  }

  personalSettings = () => {
    this.setState({
      personal: true,
      public: false
    });
  };

  publicSettings = () => {
    this.setState({
      personal: false,
      public: true
    });
  };

  render() {
    return (
      <div className="settings-container">
        <div className="settings-menu-div">
          <button className="settings-profile-image">
            <img src={require('./assets/blank image.png')} />
          </button>
          <h2 className="settings-name">Name Here</h2>
          <div className="settins-buttton-div">
            <button
              className="personal-details-button"
              onClick={this.personalSettings}
            >
              Personal Details
            </button>
            <br />
            <button
              className="public-profile-button"
              onClick={this.publicSettings}
            >
              Public Profile
            </button>
          </div>
        </div>
        <div className="settings-info-div">
          {this.state.public === true ? <PublicProfile /> : <PersonalDetails />}
        </div>
      </div>
    );
  }
}

export default SettingsPage;
