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

  componentWillMount() {
    var options = {
      sort: { createdAt: -1 },
      limit: 24
    };
    this.props.getProjects(options, null);
  }

  public searchSubmit(
    e:
      | React.FormEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ): void {
    e.preventDefault();
    this.props.searchProjects(this.state.searchTerm);
    this.props.getProjects(
      { limit: 24 },
      { searchTerm: this.state.searchTerm }
    );
    console.log(
      'setting searchResults in projectsPage=' + this.props.searchResults
    );
  }

  public searchInputHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
    e.persist();
    this.setState({ searchTerm: e.currentTarget.value }, () => {
      if (e.keyCode === 13) {
        this.searchSubmit(e);
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
            onKeyUp={e => this.searchInputHandler(e)}
          />
          <button
            className="projects-search-btn"
            type="submit"
            onClick={e => this.searchSubmit(e)}
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
