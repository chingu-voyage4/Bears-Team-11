import * as React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import Footer from '../Footer/Footer';
import Projects from '../Project/Projects';
import ProjectsFilter from './ProjectsFilter';
import '../styles/ProjectsPage.css';
import '../styles/Project.css';
import { ProjectPageState } from '../types/ProjectsPage.d';
import { Store, ProjectPageProps, Action } from '../types/Redux';
import { connect, Dispatch } from 'react-redux';
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    },
    searchProjects: (query: string | null) => {
      return dispatch(searchProjects(query));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
