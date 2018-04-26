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
        var arrayOfElem: any = [
          document.getElementById('settings-roles-designer'),
          document.getElementById('settings-roles-programmer')
        ];
        if (this.state.roles !== undefined && this.state.roles.length === 1) {
          if (this.state.roles.includes('programmer')) {
            document.getElementById('settings-roles-designer')!.classList.add(
              'options-button-disabled'
            );
          } else if (this.state.roles.includes('designer')) {
            document.getElementById('settings-roles-programmer')!.classList.add(
              'options-button-disabled'
            );
          }
        } else if (
          (this.state.roles !== undefined && this.state.roles.length === 0) ||
          this.state.roles === undefined
        ) {
          arrayOfElem.forEach(function(elem: Element) {
            elem.classList.add('options-button-disabled');
          });
        }
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

    this.setState({ [name]: value } as any);
  }

  public handleRoles(e: React.FormEvent<HTMLButtonElement>): void {
    e.persist();
    var { value, classList } = e.currentTarget;
    var array = this.state.roles.slice();
    classList.toggle('options-button-disabled');

    // if elem has Disabled style, remove from roles array
    if (classList.contains('options-button-disabled')) {
      var index = array.indexOf(value);
      array.splice(index, 1);
      this.setState({ roles: array });
    } else {
      // elem should be in array. check if already inside array, if not, add.
      if (array.indexOf(value) === -1) {
        array.push(value);
        this.setState({ roles: array });
      }
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

  public handleSkillRemoval = (
    e: React.MouseEvent<HTMLButtonElement>,
    stateName: any,
    array: string[]
  ): void => {
    e.persist();
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var index = array.indexOf(value);
    array.splice(index, 1);
    this.setState({ [stateName]: array });
  };

  public handleSkillChange(e: React.KeyboardEvent<HTMLInputElement>): void {
    e.persist();
    var { value } = e.currentTarget;
    if (e.keyCode === 13) {
      var array = this.state.skills.slice();
      if (array.indexOf(value) === -1) {
        array.push(value);
      }
      this.setState({ skills: array } as any);
    }
  }

  render() {
    class ChosenSkills extends React.Component<{
      skills: any;
      handleSkillRemoval: any;
    }> {
      render() {
        var chosenSkills;
        var skills =
          this.props.skills === undefined ? [] : this.props.skills.slice();

        if (skills.length === 0) {
          chosenSkills = null;
        } else {
          chosenSkills = skills.map((skill: string, index: number) => {
            return (
              <div className="skill-container" key={index}>
                <input
                  type="button"
                  className="new-project-chosen-tag"
                  value={skill}
                />
                <button
                  type="button"
                  className="remove-tag-btn"
                  onClick={e =>
                    this.props.handleSkillRemoval(e, 'skills', skills)
                  }
                >
                  X
                </button>
              </div>
            );
          });
        }
        return (
          <div className="chosen-skills-grid-container">{chosenSkills}</div>
        );
      }
    }
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
          <div className="settings-labels-roles">
            <label className="updateUserLabel">Roles</label>
            <button
              className="settings-roles-option-a"
              id="settings-roles-programmer"
              value="programmer"
              onClick={e => this.handleRoles(e)}
            >
              Programmer
            </button>
            <button
              className="settings-roles-option-b"
              id="settings-roles-designer"
              value="designer"
              onClick={e => this.handleRoles(e)}
            >
              Designer
            </button>
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
              id="settings-input"
              onKeyUp={e => this.handleSkillChange(e)}
            />
          </div>
          <ChosenSkills
            skills={this.state.skills}
            handleSkillRemoval={this.handleSkillRemoval}
          />

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
