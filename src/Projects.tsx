import * as React from 'react';
import './styles/Project.css';
import {
  State,
  Props,
  ProjectsState,
  ProjectsInheritedProps
} from './types/Projects.d';
import { Store } from './types/Redux';
import { connect } from 'react-redux';

class Project extends React.Component<Props, State> {
  render() {
    var data = this.props.project;
    var roles;
    if (data.lookingFor && data.lookingFor.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else {
      roles = data.lookingFor;
    }
    return (
      <div className="project">
        <img
          className="project-image"
          alt={data.name}
          // src="https://s3.us-east-2.amazonaws.com/project-match/project/5ada5b2132bf984d80ebc697/1524525889261.jpeg"
          src={
            data.images === [] ||
            data.images![0] === undefined ||
            data.images![0] === null
              ? require('./assets/imagePlaceholder.jpg')
              : data.images![0]
          }
        />
        <div className="project-info">
          <div className="project-name">{data.name}</div>
          <div className="project-description">{data.description}</div>
          <div className="project-roles-needed">
            looking for
            <div className="project-roles">{roles}</div>
          </div>
          <a>
            <img
              className="project-save"
              src={require('./assets/Bookmark Icon.png')}
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

  // Currently using a random number for the key property in order to mute the console errors.
  // When we have the data ready we need to use an actual key such as an id.
  render() {
    var projectComponent;
    var projectArray;

    if (this.props.arrayOfProjects === 'projects') {
      projectArray = this.props.projects;
    } else if (this.props.arrayOfProjects === 'searchResults') {
      projectArray = this.props.searchResults;
    }

    if (projectArray === undefined) {
      projectComponent = null;
    } else if (
      projectArray.length === 1 ||
      Array.isArray(projectArray) === false
    ) {
      projectComponent = (
        <Project key={'projects_1'} project={projectArray[0]} />
      );
    } else if (projectArray) {
      projectComponent = projectArray.map(function(
        // tslint:disable-next-line
        projectData: any,
        index: number
      ) {
        return <Project key={'projects_' + index} project={projectData} />;
      });
    }

    return <div className="projects-container">{projectComponent}</div>;
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, {})(Projects);
