import * as React from 'react';
import '../styles/ProjectFeatures.css';

class ProjectFeatures extends React.Component {
  render() {
    return (
      <div>
        <div className="project-match-container">
          <h1 className="project-feature-heading">PROJECT MATCH</h1>
          <h3 className="project-feature-text">
            Programmers and designers use Project Match
            to find teammates for budding ideas. Project Match
            will help find you projects and then provide team
            collaboration tools to support mockup reviews.
            </h3>
          <div className="project-feature-image-div">
            <img className="project-feature-imac" src={require('../assets/proj_imac.png')} />
          </div>
        </div>
        <div className="team-collaboration-container">
          <h1 className="project-feature-heading">TEAM COLLABORATION</h1>
          <h3 className="project-feature-text">
            Programmers and designers use Project Match
            to find teammates for budding ideas. Project
            Match will help find you projects and then provide team
            collaboration tools to support mockup reviews.
          </h3>
          <div className="project-feature-image-div">
            <img className="project-feature-imac" src={require('../assets/proj_imac.png')} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFeatures;