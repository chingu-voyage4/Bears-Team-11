import * as React from 'react';

class Team extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <h3>Team:</h3>
        <ul className="team__list">
          <li className="team__list-item">
            <a href="">
              <img
                className="team__thumbnail"
                src="https://placeimg.com/50/50/people"
                alt=""
              />
            </a>
          </li>
          <li className="team__list-item">
            <a href="">
              <img
                className="team__thumbnail"
                src="https://placeimg.com/50/50/people"
                alt=""
              />
            </a>
          </li>
          <li className="team__list-item">
            <a href="">
              <img
                className="team__thumbnail"
                src="https://placeimg.com/50/50/people"
                alt=""
              />
            </a>
          </li>
          <li className="team__list-item">
            <a href="">
              <img
                className="team__thumbnail"
                src="https://placeimg.com/50/50/people"
                alt=""
              />
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Team;
