import * as React from 'react';
import { connect } from 'react-redux';
import { Store, ProjectSettingsProps } from '../types/Redux';
import { ProjectSettingsState } from '../types/ProjectSettings';
import { getUserProjects, deleteProject } from '../actions/projectActions';
import ProjectForEdit from '../Project/ProjectContainerForSettings';

class ProjectSettings extends React.Component<
  ProjectSettingsProps,
  ProjectSettingsState
> {
  constructor(props: ProjectSettingsProps) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserProjects(this.props.user.username);
  }

  render() {
    var returnedComponent;
    var projectArray = this.props.userProjects;
    if (!projectArray) {
      returnedComponent = null;
    } else if (!Array.isArray(projectArray)) {
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
    userProjects: state.userProjects
  };
}

export default connect(mapStateToProps, { getUserProjects, deleteProject })(
  ProjectSettings as any
);
