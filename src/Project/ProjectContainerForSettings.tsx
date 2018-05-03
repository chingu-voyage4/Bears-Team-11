import { Link } from 'react-router-dom';
import * as React from 'react';
import '../styles/Project.css';
import { State } from '../types/Projects.d';
import { Store, ProjectForEditProps } from '../types/Redux';
import { connect } from 'react-redux';
import { deleteProject } from '../actions/projectActions';
import TagCategoryContainer from './TagContainer';
import RolesContainer from './RolesContainer';
import { EditImageContainer } from './ImageContainer';
class ProjectForEdit extends React.Component<ProjectForEditProps, State> {
  constructor(props: ProjectForEditProps) {
    super(props);
  }

  public deleteProject(
    e: React.MouseEvent<HTMLButtonElement>,
    projId: string
  ): void {
    this.props.deleteProject(projId);
  }

  render() {
    var data = this.props.data;

    return (
      <div id={this.props.projId} className="project-edit-box">
        <div className="project-edit-container">
          <EditImageContainer project={data} projId={this.props.projId} />
          <div className="project-edit-info">
            <div className="project-name">{data.name}</div>
            <div className="project-description">{data.description}</div>
            <TagCategoryContainer project={this.props.data} />
            <div className="project-roles-needed">
              looking for
              <RolesContainer project={this.props.data} />
            </div>
          </div>
          <div>
            <button
              onClick={e => this.deleteProject(e, this.props.projId)}
              className="project-delete-btn"
            >
              Delete Project
            </button>
          </div>
          <div />
          <div />
          <div />
          <div>
            <Link
              className="project-edit-btn"
              to={'/projects/update/' + this.props.projId}
            >
              Edit Project
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps, { deleteProject })(ProjectForEdit);
