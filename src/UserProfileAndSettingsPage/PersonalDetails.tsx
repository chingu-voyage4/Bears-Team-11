import * as React from 'react';
import { PersonalDetailsProps } from '../types/PersonalDetails.d';
import { PersonalDetailsState } from '../types/PersonalDetails.d';

class PersonalDetails extends React.Component<
  PersonalDetailsProps,
  PersonalDetailsState
> {
  constructor(props: PersonalDetailsProps) {
    super(props);
    this.state = {
      password: ''
    };
  }

  public handlePasswordChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      password: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <div className="info-container">
          <div className="settings-headers">
            <h1>Personal Stuff</h1>
          </div>
          <div className="settings-labels">
            <h3>Password:</h3>
            <input
              className="settings-textarea"
              value={this.state.password}
              onChange={e => this.handlePasswordChange(e)}
            />
          </div>
          <button className="personal-details-save-button">Save</button>
        </div>
      </div>
    );
  }
}

export default PersonalDetails;
