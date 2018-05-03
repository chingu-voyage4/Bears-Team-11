import * as React from 'react';
import '../styles/Project.css';

class RolesContainer extends React.Component<{ project: any }, {}> {
  render() {
    var data = this.props.project;
    var roles;
    if (data.lookingFor && data.lookingFor.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else if (data.lookingFor!.length === 1) {
      roles = data.lookingFor;
    } else {
      roles = 'None';
    }
    return <div className="project-roles">{roles}</div>;
  }
}

export default RolesContainer;
