import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import {
  ProjectSettingsProps,
  ProjectSettingsState
} from '../types/ProjectSettings';
import Projects from '../Projects';
import { getProjects, updateProject } from '../actions/projectActions';

class ProjectSettings extends React.Component<
  ProjectSettingsProps,
  ProjectSettingsState
> {
  constructor(props: ProjectSettingsProps) {
    super(props);
  }

  componentWillMount() {
    this.props.getProjects({}, { creator: this.props.user.username });
  }

  public goToEditProjectPageHandler(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    // retrieve projectId from project component
    // save to updateProject action
    // redirect to update Project data page
    // after save, set updateProject to null again
    // so a new instance of it will be "add project", not updating the same data
    // var projectId = e.currentTarget._id;
    // this.props.updateProject(projectId);
  }

  render() {
    return (
      <div className="info-container">
        <Projects arrayOfProjects="projects" />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects
  };
}
export default connect(mapStateToProps, { getProjects, updateProject })(
  ProjectSettings
);
