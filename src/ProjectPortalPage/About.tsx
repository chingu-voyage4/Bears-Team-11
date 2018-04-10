import * as React from 'react';
import Team from './Team';

class About extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <div className="about__heading">
          <h1>Momentum Project</h1>
          <p>Due November 31st, 2017</p>
        </div>
        <div className="about__body">
          <p className="about__description">
            Clone of the momentum chrome eetnsion, with these following design
            changes: (1) adding a link to github repots, (2) ability to search
            and pin new weather locations. We are looking for a designer to
            re-work the layout based off our uploaded precedents.
          </p>
          <div>
            <ul className="about__links">
              <li>Github Repo</li>
              <li>Published Site</li>
              <li>Final Mockup</li>
              <li className="looking-for">looking for DESIGNER</li>
              <li>
                <a className="button" href="">
                  Join Team
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Team />
        </div>
      </React.Fragment>
    );
  }
}

export default About;
