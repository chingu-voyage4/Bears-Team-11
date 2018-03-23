import * as React from 'react';
import '../styles/ProjectFeatures.css';

class ProjectFeatures extends React.Component {
  render() {
    return (
      <div>
        <div className="project-match-container">
          <div className="project-feature-heading">PROJECT MATCH</div>
          <div className="project-feature-text">
            Programmers and designers use Project Match to find teammates for
            budding ideas. Project Match will help find you projects and then
            provide team collaboration tools to support mockup reviews.
          </div>
          <div className="project-feature-image-div">
            <img
              className="project-feature-imac"
              src={require('../assets/proj_imac.png')}
            />
          </div>
        </div>
        <div className="team-collaboration-container">
          <div className="project-feature-heading">TEAM COLLABORATION</div>
          <div className="project-feature-text">
            Programmers and designers use Project Match to find teammates for
            budding ideas. Project Match will help find you projects and then
            provide team collaboration tools to support mockup reviews.
          </div>
          <div className="project-feature-image-div">
            <img
              className="project-feature-imac"
              src={require('../assets/proj_imac.png')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFeatures;
