import * as React from 'react';
import '../styles/RecentProjects.css';
import Projects from '../Projects';
import { RecentProjectsProps } from '../types/LandingPage.d';
import { Link } from 'react-router-dom';
import { Store } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
class RecentProjects extends React.Component<RecentProjectsProps, {}> {
  constructor(props: RecentProjectsProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getProjects(['createdAt', 'active']);
  }

  render() {
    return (
      <div className="recent-projects-container">
        <hr className="horizontal-line" />
        <h1 className="recent-projects-header">Recent Projects</h1>
        <Projects arrayOfProjects={'projects'} />
        <Link to="/projects" className="explore-projects-button">
          Explore More Projects
        </Link>
        <hr className="horizontal-line" />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps, {
  getProjects
})(RecentProjects);
