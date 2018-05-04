import * as React from 'react';
import ProjectForPublicProfile from '../Project/ProjectForPublicProfile';

class UserProjects extends React.Component<{ projects: any }, {}> {
  render() {
    var renderedProjects;
    var projects: any = this.props.projects;
    if (projects === undefined || projects.length === 0) {
      renderedProjects = null;
    } else if (projects.length === 1) {
      renderedProjects = (
        <ProjectForPublicProfile projId={projects[0]._id} data={projects[0]} />
      );
    } else {
      renderedProjects = projects.map((project: any, index: number) => {
        return (
          <ProjectForPublicProfile
            key={'projects_Edit_' + index}
            projId={project._id}
            data={project}
          />
        );
      });
    }
    return <div>{renderedProjects}</div>;
  }
}
export default UserProjects;
