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
      username: '',
      email: '',
      password: ''
    };
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
            <h1>Personal Stuff</h1>
          </div>
          <div className="settings-labels">
            <h3>Username:</h3>
            <input
              className="settings-input"
              name="username"
              value={this.state.username}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Email:</h3>
            <input
              className="settings-input"
              name="email"
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Password:</h3>
            <input
              className="settings-input"
              value={this.state.password}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <button className="personal-details-save-button">Save</button>
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
