import * as React from 'react';
import '../styles/SettingsPage.css';
import { Store } from '../types/Redux';
import { PassedProps, State } from '../types/SettingsPage.d';
import { connect } from 'react-redux';
import PublicProfile from './PublicProfile';
import PersonalDetails from './PersonalDetails';
import HeaderContainer from '../HeaderContainer';
import Footer from '../Footer';

class SettingsPage extends React.Component<PassedProps, State> {
  constructor(props: PassedProps) {
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
        <HeaderContainer />
        <div className="settings-menu-div">
          <button className="settings-profile-image">
            <img src={require('../assets/blank image.png')} />
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
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(SettingsPage);
