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
    this.props.searchProjects(this.state.searchTerm);
  }

  public inputHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
    this.setState({ searchTerm: e.currentTarget.value }, () => {
      this.props.searchProjects(this.state.searchTerm);
    });
  }

  render() {
    var renderSearchResults;
    if (this.props.searchResults) {
      renderSearchResults = <Projects arrayOfProjects={'searchResults'} />;
    } else {
      renderSearchResults = null;
    }

    var renderProjectContainer;
    if (this.props.projects) {
      renderProjectContainer = <Projects arrayOfProjects={'projects'} />;
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

        {renderSearchResults}

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
    projects: state.projects,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, {
  getProjects,
  searchProjects
})(ProjectsPage);
