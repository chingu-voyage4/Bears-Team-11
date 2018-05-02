import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Store, ProjectSettingsProps, Action } from '../types/Redux';
import { ProjectSettingsState } from '../types/ProjectSettings';
import { getProjects, deleteProject } from '../actions/projectActions';
import ProjectForEdit from '../Project/ProjectContainerForSettings';

class ProjectSettings extends React.Component<
  ProjectSettingsProps,
  ProjectSettingsState
> {
  constructor(props: ProjectSettingsProps) {
    super(props);
  }

  componentWillMount() {
    this.props.getProjects({}, {});
  }

  render() {
    var returnedComponent;
    var projectArray = this.props.projects;
    projectArray = projectArray.filter(project => {
      return (
        project.creator === this.props.user.username ||
        project.team!.indexOf(this.props.user.username!) !== -1
      );
    });
    if (projectArray.length === 0) {
      returnedComponent = null;
    } else if (
      projectArray.length === 1 ||
      Array.isArray(projectArray) === false
    ) {
      returnedComponent = (
        <ProjectForEdit projId={projectArray[0]._id} data={projectArray[0]} />
      );
    } else {
      returnedComponent = projectArray.map(function(
        projectData: any,
        index: number
      ) {
        return (
          <ProjectForEdit
            key={'projects_Edit_' + index}
            projId={projectData._id}
            data={projectData}
          />
        );
      });
    }
    return <div className="info-container">{returnedComponent}</div>;
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    },
    deleteProject: (id: string) => {
      return dispatch(deleteProject(id));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettings);
