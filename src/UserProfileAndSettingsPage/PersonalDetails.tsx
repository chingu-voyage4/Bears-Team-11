import * as React from 'react';
import { Store, PersonalDetailsProps } from '../types/Redux';
import { PersonalDetailsState } from '../types/PersonalDetails.d';
import { connect } from 'react-redux';
import { userPrivateSettingsUpdate } from '../actions/userActions';

class PersonalDetails extends React.Component<
  PersonalDetailsProps,
  PersonalDetailsState
> {
  constructor(props: PersonalDetailsProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userId: ''
    };
  }

  public submit(e: React.FormEvent<HTMLButtonElement>): void {
    this.props.userPrivateSettingsUpdate(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.userId
    );
  }

  public handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    } as any);
  }

  render() {
    return (
      <div>
        <div className="info-container">
          <div className="settings-headers">
            <label className="settings-subhead-text">Personal Details</label>
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">First Name</label>
            <input
              className="settings-input"
              name="blog"
              value={this.state.firstName}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Last Name</label>
            <input
              className="settings-input"
              name="blog"
              value={this.state.lastName}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Email</label>
            <input
              className="settings-input"
              name="blog"
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">UserId</label>
            <input
              className="settings-input"
              name="blog"
              value={this.state.userId}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="update-profile-btn">
            <button
              className="public-profile-save-button"
              onClick={e => this.submit(e)}
            >
              Update User Settings
            </button>
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

export default connect(mapStateToProps, { userPrivateSettingsUpdate })(
  PersonalDetails
);
