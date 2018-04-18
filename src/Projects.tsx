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
    console.log('data=' + JSON.stringify(data));
    // var roles;
    // if (data.lookingFor && data.lookingFor.length > 1) {
    //   roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    // } else {
    //   roles = data.lookingFor;
    // }

    return (
      <div className="project">
        {/* <img
          className="project-image"
          alt={data.name}
          src={data.images ? data.images[0] : undefined}
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
        </div> */}
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
    var projectArray = this.props.arrayOfProjects;

    if (projectArray[0] === undefined) {
      projectComponent = null;
    } else {
      console.log('projectArray=' + projectArray);
      console.log('projectArray[0]=' + projectArray[0]);
      // tslint:disable-next-line
      projectComponent = projectArray[0].map(function(
        projectData: any,
        index: number
      ) {
        console.log(projectData);
        return <Project key={'projects_' + index} project={projectData} />;
      });
    }

    return <div className="projects-container">{projectComponent}</div>;
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps, {})(Projects);
