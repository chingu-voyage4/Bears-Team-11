import * as React from 'react';
import Team from './Team';
import * as moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../.config';

interface AboutProps {
  name: string | undefined;
  dueDate: string | undefined;
  description: string | undefined;
  githubLink: string | undefined;
  liveLink: string | undefined;
  mockupLink: string | undefined;
  lookingFor: Array<string> | undefined;
  projectId: string;
  status: boolean;
  user: any;
}

class About extends React.PureComponent<AboutProps> {
  sendJoinRequest = (e: any) => {
    e.preventDefault();
    axios
      .post(config.host.name + '/api/email/', {
        link: `${config.client.name}/user/profile/${this.props.user.username}`,
        username: this.props.user.username,
        projectName: this.props.name,
        projectId: this.props.projectId
      })
      .then(res => {
        if (res.status === 200) {
          alert('Request sent successfully!');
        } else {
          alert(
            'There was an issue sending your request, please try again later'
          );
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="about__heading">
          <h1>{this.props.name}</h1>
          {this.props.status && this.props.dueDate ? (
            <p>Due {moment(this.props.dueDate).format('ll')}</p>
          ) : null}
        </div>
        <div className="about__body">
          <p className="about__description">{this.props.description}</p>
          <div>
            <ul className="about__links">
              {this.props.githubLink !== '' ? (
                <li>
                  <a href={this.props.githubLink}>Github Repo</a>
                </li>
              ) : null}
              {this.props.liveLink !== '' ? (
                <li>
                  <a href={this.props.liveLink}>Published Site</a>
                </li>
              ) : null}
              {this.props.mockupLink !== '' ? (
                <li>
                  <a href={this.props.mockupLink}>Final Mockup</a>
                </li>
              ) : null}

              <li className="looking-for">
                looking for{' '}
                {this.props.lookingFor && this.props.lookingFor.length > 0
                  ? this.props.lookingFor[0].toUpperCase()
                  : 'NONE'}
              </li>
              {this.props.user._id && this.props.status ? (
                <li>
                  <a className="button" href="" onClick={this.sendJoinRequest}>
                    Join Team
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div>
          <Team projectId={this.props.projectId} />
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(About);
