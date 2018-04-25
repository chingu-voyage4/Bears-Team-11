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
import { getProjects, searchProjects } from '../actions/projectActions';

class ProjectsPage extends React.Component<ProjectPageProps, ProjectPageState> {
  constructor(props: ProjectPageProps) {
    super(props);
    this.state = {
      searchTerm: '',
      projectComponent: null
    };
  }

  componentDidMount() {
    var options = {
      sort: { createdAt: -1 },
      limit: 24
    };
    this.props.getProjects(options, null);
  }

  public onFormChange(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    this.props.getProjects(
      { limit: 24 },
      { searchTerm: this.state.searchTerm }
    );
  }

  public inputHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
    e.persist();
    this.setState({ searchTerm: e.currentTarget.value }, () => {
      if (e.keyCode === 13) {
        this.props.getProjects(
          { limit: 24 },
          { searchTerm: this.state.searchTerm }
        );
      }
    });
  }

  render() {
    return (
      <div>
        <HeaderContainer />

        <br />

        <div className="projects-header-text">Explore Projects</div>

        <form className="projects-search-form">
          <input
            className="projects-search-box"
            type="search"
            placeholder="Search for Projects"
            id="projects-search-input-box"
            onKeyUp={e => this.inputHandler(e)}
          />
          <button
            className="projects-search-btn"
            type="submit"
            onClick={e => this.onFormChange(e)}
          >
            Search
          </button>
        </form>

        <ProjectsFilter />

        <Projects arrayOfProjects={'projects'} />

        <br />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    user: state.user,
    projects: state.projects,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, {
  getProjects,
  searchProjects
})(ProjectsPage);
