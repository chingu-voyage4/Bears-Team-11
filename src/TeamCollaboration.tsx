import * as React from 'react';
import './styles/TeamCollaboration.css';

class TeamCollaboration extends React.Component {
  render() {
    return (
      <div className="team-collaboration-container">
          <div className="team-collaboration-text">
            <h1>TEAM COLLABORATION</h1>
            <h3>Programmers and designers use Project Match
                 to find teammates for budding ideas. Project
                  Match will help find you projects and then provide team
                   collaboration tools to support mockup reviews.</h3>
          </div>
          <div className="team-collaboration-image-div">
          <img className="team-collaboration-imac" src={require('./assets/proj_imac.png')} />
          </div>
      </div>
    );
  }
}

export default TeamCollaboration;