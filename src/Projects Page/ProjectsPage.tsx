import * as React from 'react';
import HeaderContainer from '../HeaderContainer';
import Footer from '../Footer';
import Projects from '../Projects';
import ProjectsFilter from './ProjectsFilter';
import '../styles/ProjectsPage.css';
import '../styles/Project.css';
import { ProjectPageProps, ProjectPageState } from '../types/ProjectsPage.d';
import { Store } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';

class ProjectsPage extends React.Component<ProjectPageProps, ProjectPageState> {
  constructor(props: ProjectPageProps) {
    super(props);
    this.state = {
      searchTerm: '',
      projectComponent: null
    };
    var options = {
      sort: { createdAt: -1 }, // returns by newest
      limit: 6
    };
    this.props.getProjects(options, null);
  }

  public onFormChange(e: React.FormEvent<HTMLButtonElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  }

  render() {
    var renderProjectContainer;
    if (this.props.projects) {
      renderProjectContainer = (
        <Projects arrayOfProjects={this.props.projects} />
      );
    } else {
      renderProjectContainer = null;
    }
    return (
      <div>
        <HeaderContainer />
        <div className="projects-header-text">Explore Projects</div>

        <form className="projects-search-form">
          <input
            className="projects-search-box"
            type="search"
            placeholder="Search for Projects"
          />
          <button className="projects-search-btn" type="submit">
            Search
          </button>
        </form>

        <ProjectsFilter />

        {renderProjectContainer}

        <br />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    user: state.user,
    projects: state.projects
  };
};

export default connect(mapStateToProps, {
  getProjects
})(ProjectsPage);
