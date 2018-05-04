import * as React from 'react';
import '../styles/RecentProjects.css';
import Projects from '../Project/Projects';
import { Link } from 'react-router-dom';
import { Store, RecentProjectsProps, Action } from '../types/Redux';
import { connect, Dispatch } from 'react-redux';
import { getProjects } from '../actions/projectActions';
class RecentProjects extends React.Component<RecentProjectsProps, {}> {
  constructor(props: RecentProjectsProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getProjects(
      {
        sort: { createdAt: -1 },
        limit: 6
      },
      {}
    );
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
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects
  };
};

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentProjects);
