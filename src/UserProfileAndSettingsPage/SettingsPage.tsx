import * as React from 'react';
import '../styles/SettingsPage.css';
import { Store, SettingsPageProps } from '../types/Redux';
import { State } from '../types/SettingsPage.d';
import { connect } from 'react-redux';
import { uploadProfileImage } from '../actions/userActions';
import PublicProfile from './PublicProfile';
import PersonalDetails from './PersonalDetails';
import ProjectSettings from './ProjectSettings';
import HeaderContainer from '../Header/HeaderContainer';
import Footer from '../Footer/Footer';

class SettingsPage extends React.Component<SettingsPageProps, State> {
  constructor(props: SettingsPageProps) {
    super(props);
    this.state = {
      personal: false,
      public: true,
      project: false,
      loaderVisible: false,
      profileImage: require('../assets/blank image.png')
    };
  }

  componentDidMount() {
    if (this.props.user.profileImage !== '') {
      this.setState({ profileImage: this.props.user.profileImage! });
    }
  }
  personalSettings = () => {
    this.setState({
      personal: true,
      public: false,
      project: false
    });
  };

  publicSettings = () => {
    this.setState({
      personal: false,
      public: true,
      project: false
    });
  };

  projectSettings = () => {
    this.setState({
      project: true,
      public: false,
      personal: false
    });
  };

  toggleImageUploadShow = (e: any) => {
    var doc = document.getElementById('settings-profile-image-id')!;
    doc.classList.toggle('settings-image-upload-show');
  };

  uploadProfileImage = (e: any) => {
    let file = e.currentTarget.files! as FileList;
    if (file) {
      console.log(file);
      this.setState({ loaderVisible: true });
      this.props.uploadProfileImage(file, this.props.user._id).then(() => {
        this.setState({
          loaderVisible: false,
          profileImage: this.props.user.profileImage!
        });
      });
    }
  };
  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="settings-container">
          <div className="settings-menu-div">
            {this.state.loaderVisible ? (
              <div className="loader" />
            ) : (
              <img
                className="settings-profile-image"
                onMouseEnter={e => this.toggleImageUploadShow(e)}
                src={this.state.profileImage}
              />
            )}
            <div
              onMouseOut={e => this.toggleImageUploadShow(e)}
              id="settings-profile-image-id"
              className="settings-profile-image-upload"
            >
              <img
                src={require('../assets/icons8-pencil-52.png')}
                className="settings-profile-image-icon"
              />
              <input
                id="profile-image-upload"
                type="file"
                onChange={e => this.uploadProfileImage(e)}
              />
            </div>
            <h2 className="settings-name">{this.props.user.username}</h2>
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
              <br />
              <button
                className="public-profile-button"
                onClick={this.projectSettings}
              >
                Projects
              </button>
            </div>
          </div>
          <div className="settings-info-div">
            {this.state.public === true ? <PublicProfile /> : null}
            {this.state.personal === true ? <PersonalDetails /> : null}
            {this.state.project === true ? <ProjectSettings /> : null}
          </div>
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

export default connect(mapStateToProps, { uploadProfileImage })(
  SettingsPage as any
);
