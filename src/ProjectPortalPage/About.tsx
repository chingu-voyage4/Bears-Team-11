import * as React from 'react';
import Team from './Team';
import * as moment from 'moment';

class About extends React.PureComponent<
  {
    name: string | undefined;
    dueDate: string | undefined;
    description: string | undefined;
    githubLink: string | undefined;
    liveLink: string | undefined;
    mockupLink: string | undefined;
    lookingFor: Array<string> | undefined;
    projectId: string;
  },
  {}
> {
  render() {
    return (
      <React.Fragment>
        <div className="about__heading">
          <h1>{this.props.name}</h1>
          <p>Due {moment(this.props.dueDate).format('ll')}</p>
        </div>
        <div className="about__body">
          <p className="about__description">{this.props.description}</p>
          <div>
            <ul className="about__links">
              <li>
                <a href={this.props.githubLink}>Github Repo</a>
              </li>
              <li>
                <a href={this.props.liveLink}>Published Site</a>
              </li>
              <li>
                <a href={this.props.mockupLink}>Final Mockup</a>
              </li>
              <li className="looking-for">
                looking for{' '}
                {this.props.lookingFor
                  ? this.props.lookingFor[0].toUpperCase()
                  : null}
              </li>
              <li>
                <a className="button" href="">
                  Join Team
                </a>
              </li>
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

export default About;
