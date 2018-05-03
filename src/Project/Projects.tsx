import * as React from 'react';
import '../styles/Project.css';
import { State, Props, ProjectsState } from '../types/Projects.d';
import { Store, ProjectsInheritedProps } from '../types/Redux';
import { connect } from 'react-redux';
import { ImageContainer } from './ImageContainer';
import TagCategoryContainer from './TagContainer';
import RolesContainer from './RolesContainer';

class Project extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    var data = this.props.project;

    return (
      <div className="project">
        <ImageContainer project={data} projId={this.props.projId} />
        <div className="project-info">
          <div className="project-name">{data.name}</div>
          <div className="project-description">{data.description}</div>
          <TagCategoryContainer project={this.props.project} />
          <div className="project-roles-needed">
            looking for
            <RolesContainer project={this.props.project} />
          </div>
          <a>
            <img
              className="project-save"
              src={require('../assets/Bookmark Icon.png')}
            />
          </a>
        </div>
      </div>
    );
  }
}

class Projects extends React.Component<ProjectsInheritedProps, ProjectsState> {
  constructor(props: ProjectsInheritedProps) {
    super(props);
  }

  render() {
    var projectComponent;
    var projectArray = this.props.projects;

    if (projectArray === undefined) {
      projectComponent = null;
    } else if (
      projectArray.length === 1 ||
      Array.isArray(projectArray) === false
    ) {
      projectComponent = (
        <Project
          projId={projectArray[0]._id}
          key={'projects_1'}
          project={projectArray[0]}
        />
      );
    } else if (projectArray) {
      projectComponent = projectArray.map(function(
        projectData: any,
        index: number
      ) {
        return (
          <Project
            projId={projectData._id}
            key={'projects_' + index}
            project={projectData}
          />
        );
      });
    }

    return <div className="projects-container">{projectComponent}</div>;
  }
}

const mapStateToProps = (state: Store) => {
  return {
    user: state.user,
    projects: state.projects,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, {})(Projects);
