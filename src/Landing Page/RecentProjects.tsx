import * as React from 'react';
import '../styles/RecentProjects.css';
import Projects from '../Projects';
class RecentProjects extends React.Component {
  render() {
    return (
      <div className="recent-projects-container">
        <hr className="horizontal-line" />
        <h1 className="recent-projects-header">Recent Projects</h1>
        <Projects count={6} />
        <button className="explore-projects-button">
          Explore More Projects
        </button>
        <hr className="horizontal-line" />
      </div>
    );
  }
}

export default RecentProjects;
