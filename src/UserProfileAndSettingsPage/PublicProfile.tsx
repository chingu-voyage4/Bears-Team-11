import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import { PublicProfileProps } from '../types/PublicProfile.d';
import { PublicProfileState } from '../types/PublicProfile.d';
import { userSettingsUpdate } from '../actions/userActions';

class PublicProfile extends React.Component<
  PublicProfileProps,
  PublicProfileState
> {
  constructor(props: PublicProfileProps) {
    super(props);
    this.state = {
      aboutme: '',
      headline: '',
      skills: '',
      linkedin: '',
      github: '',
      portfolio: '',
      website: '',
      twitter: '',
      blog: ''
    };
  }
  public handleTextAreaChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      aboutme: e.currentTarget.value
    });
  }
  public handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  }

  render() {
    return (
      <div>
        <div className="info-container">
          <div className="settings-headers">
            <h1>Bio</h1>
          </div>
          <div className="settings-labels">
            <h3>About Me:</h3>
            <textarea
              className="settings-textarea"
              value={this.state.aboutme}
              onChange={e => this.handleTextAreaChange(e)}
            />
          </div>
          <div className="settings-headers">
            <h1>Skills</h1>
          </div>
          <div className="settings-labels">
            <h3>Headline:</h3>
            <input
              className="settings-input"
              name="headline"
              value={this.state.headline}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Skills:</h3>
            <input
              className="settings-input"
              name="skills"
              value={this.state.skills}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-headers">
            <h1>Links</h1>
          </div>
          <div className="settings-labels">
            <h3>LinkedIn:</h3>
            <input
              className="settings-input"
              name="linkedin"
              value={this.state.linkedin}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>GitHub:</h3>
            <input
              className="settings-input"
              name="github"
              value={this.state.github}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Portfolio:</h3>
            <input
              className="settings-input"
              name="portfolio"
              value={this.state.portfolio}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Website:</h3>
            <input
              className="settings-input"
              name="website"
              value={this.state.portfolio}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Twitter:</h3>
            <input
              className="settings-input"
              name="twitter"
              value={this.state.twitter}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Blog:</h3>
            <input
              className="settings-input"
              name="blog"
              value={this.state.blog}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <button className="public-profile-save-button">Save</button>
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
export default connect(mapStateToProps, { userSettingsUpdate })(PublicProfile);
