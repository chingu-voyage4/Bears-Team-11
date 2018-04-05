import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Projects from '../Projects';
import ProjectsFilter from './ProjectsFilter';
import '../styles/ProjectsPage.css';
import '../styles/Project.css';
import { PassedProps, ProjectState } from '../types/ProjectsPage.d';
import { Store } from '../types/Redux';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';

class ProjectsPage extends React.Component<PassedProps, ProjectState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  public onFormChange(e: React.FormEvent<HTMLButtonElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  }

  render() {
    return (
      <div>
        <Header />
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

        <Projects count={24} />

        <br />

        <Footer />
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
})(ProjectsPage);

// export default ProjectsPage;
