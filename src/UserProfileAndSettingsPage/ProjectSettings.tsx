import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import {
  ProjectSettingsProps,
  ProjectSettingsState
} from '../types/ProjectSettings';
import Projects from '../Projects';
import {
  getProjects,
  updateProject,
  deleteProject
} from '../actions/projectActions';

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

  render() {
    return (
      <div className="info-container">
        <Projects arrayOfProjects="settings" />
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
export default connect(mapStateToProps, {
  getProjects,
  updateProject,
  deleteProject
})(ProjectSettings);
