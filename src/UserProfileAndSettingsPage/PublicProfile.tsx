import * as React from 'react';
import { PublicProfileProps } from '../types/PublicProfile.d';
import { PublicProfileState } from '../types/PublicProfile.d';

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
              className="settings-textarea"
              name="headline"
              value={this.state.headline}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Skills:</h3>
            <input
              className="settings-textarea"
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
              className="settings-textarea"
              name="linkedin"
              value={this.state.linkedin}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>GitHub:</h3>
            <input
              className="settings-textarea"
              name="github"
              value={this.state.github}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Portfolio:</h3>
            <input
              className="settings-textarea"
              name="portfolio"
              value={this.state.portfolio}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Website:</h3>
            <input
              className="settings-textarea"
              name="website"
              value={this.state.portfolio}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Twitter:</h3>
            <input
              className="settings-textarea"
              name="twitter"
              value={this.state.twitter}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <h3>Blog:</h3>
            <input
              className="settings-textarea"
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

export default PublicProfile;
