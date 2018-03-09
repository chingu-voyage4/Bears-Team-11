import * as React from 'react';
import './styles/Project.css';
import {
  State,
  Props,
  ProjectsState,
  ProjectsInheritedProps
} from './types/Projects.d';
import { arrayOfTestProjects } from './dummyData/Dummy Project Data';

class Project extends React.Component<Props, State> {
  render() {
    var data = this.props.project;
    var roles;
    if (data.lookingFor.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else {
      roles = data.lookingFor;
    }
    return (
      <div className="project">
        <img className="project-image" alt={data.name} src={data.image} />
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
    let projectArray = arrayOfTestProjects.slice(0, this.props.count + 1);
    return (
      <div className="projects-container">
        {projectArray.map(projectData => (
          <Project key={Math.random() * 100} project={projectData} />
        ))}
      </div>
    );
  }
}

export default Projects;
