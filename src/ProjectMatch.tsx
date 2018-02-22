import * as React from 'react';
import './styles/ProjectMatch.css';

class ProjectMatch extends React.Component {
  render() {
    return (
      <div className="project-match-container">
          <div className="project-match-text">
            <h1>PROJECT MATCH</h1>
            <h3>Programmers and designers use Project Match
               to find teammates for budding ideas. Project Match
                will help find you projects and then provide team
                 collaboration tools to support mockup reviews.</h3>
          </div>
          <div className="project-match-image-div">
          <img className="project-match-imac" src={require('./assets/proj_imac.png')} />
          </div>
      </div>
    );
  }
}

export default ProjectMatch;