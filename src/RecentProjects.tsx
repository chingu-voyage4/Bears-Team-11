import * as React from 'react';
import './styles/RecentProjects.css';

class RecentProjects extends React.Component {
  render() {
    return (
      <div>
          <h1 className="recent-projects-header">Recent Projects</h1>
          <div className="recent-projects-container">
          <div className="projectCard">Test</div>
          <div className="projectCard">Test</div>
          <div className="projectCard">Test</div>
          <div className="projectCard">Test</div>
          <div className="projectCard">Test</div>
          <div className="projectCard">Test</div>
          </div>
          <button className="explore-projects-button">Explore Projects</button>
      </div>
    );
  }
}

export default RecentProjects;