import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import {
  PublicProfileProps,
  PublicProfileState
} from '../types/PublicProfile.d';
import { userSettingsUpdate } from '../actions/userActions';

class PublicProfile extends React.Component<
  PublicProfileProps,
  PublicProfileState
> {
  constructor(props: PublicProfileProps) {
    super(props);
    this.state = {
      aboutme: '',
      location: '',
      roles: [],
      skills: [],
      linkedin: '',
      github: '',
      portfolio: '',
      website: '',
      twitter: '',
      blog: '',
      _id: ''
    };
  }

  componentWillMount() {
    this.setState(
      {
        aboutme: this.props.user.description,
        location: this.props.user.location,
        roles: this.props.user.roles,
        skills: this.props.user.techstack,
        linkedin: this.props.user.linkedInLink,
        github: this.props.user.githubLink,
        portfolio: this.props.user.portfolioLink,
        website: this.props.user.websiteLink,
        twitter: this.props.user.twitterLink,
        blog: this.props.user.blogLink,
        _id: this.props.user._id
      },
      () => {
        console.log(this.state);
      }
    );
  }

  public handleTextAreaChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      aboutme: e.currentTarget.value
    });
  }

  public handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    e.persist();
    var { name, value } = e.currentTarget;

    // temporary until we have more refined roles / skills update
    if (name === 'roles' || name === 'skills') {
      var valueArray = value.split(' ');
      this.setState({ [name]: valueArray } as any);
    } else {
      this.setState({ [name]: value } as any);
    }
  }

  public submit(e: React.FormEvent<HTMLButtonElement>): void {
    console.log(this.state._id);

    this.props.userSettingsUpdate(
      this.state.aboutme,
      this.state.location,
      this.state.roles,
      this.state.skills,
      this.state.linkedin,
      this.state.github,
      this.state.portfolio,
      this.state.website,
      this.state.twitter,
      this.state.blog,
      this.state._id
    );
  }

  render() {
    return (
      <div>
        <div className="info-container">
          <div className="settings-headers">
            <label className="settings-subhead-text">Bio</label>
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">About Me</label>
            <textarea
              className="settings-textarea"
              value={this.state.aboutme}
              onChange={e => this.handleTextAreaChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Location</label>
            <input
              className="settings-input"
              name="location"
              value={this.state.location}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Roles</label>
            <input
              className="settings-input"
              name="roles"
              value={this.state.roles}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <br />

          <div className="settings-headers">
            <label className="settings-subhead-text">Skills</label>
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Techstack</label>
            <input
              className="settings-input"
              name="skills"
              value={this.state.skills}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <br />

          <div className="settings-headers">
            <label className="settings-subhead-text">Links</label>
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">LinkedIn</label>
            <input
              className="settings-input"
              name="linkedin"
              value={this.state.linkedin}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Github</label>
            <input
              className="settings-input"
              name="github"
              value={this.state.github}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Portfolio</label>
            <input
              className="settings-input"
              name="portfolio"
              value={this.state.portfolio}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Website</label>
            <input
              className="settings-input"
              name="website"
              value={this.state.portfolio}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Twitter</label>
            <input
              className="settings-input"
              name="twitter"
              value={this.state.twitter}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="settings-labels">
            <label className="updateUserLabel">Blog</label>
            <input
              className="settings-input"
              name="blog"
              value={this.state.blog}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <br />

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
export default connect(mapStateToProps, { userSettingsUpdate })(PublicProfile);
