import { Link } from 'react-router-dom';
import * as React from 'react';
import './styles/Project.css';
import { State } from '../types/Projects.d';
import { Store, ProjectForEditProps } from '../types/Redux';
import { connect } from 'react-redux';
import { deleteProject } from '../actions/projectActions';

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

    var roles;
    if (data.lookingFor && data.lookingFor!.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else if (data.lookingFor && data.lookingFor!.length === 1) {
      roles = data.lookingFor;
    } else {
      roles = 'None';
    }

    var tags;
    if (data.tags !== undefined && data.tags.length > 0) {
      tags = data.tags.map((tagName: string, index: number) => {
        var link = '/tag/' + tagName;
        return (
          <Link to={link} key={index} className="projects-tag-links">
            {tagName}
          </Link>
        );
      });
    }

    var category;
    if (data.category) {
      var categoryLink = '/category/' + data.category;
      category = (
        <Link to={categoryLink} className="projects-category-links">
          {data.category}
        </Link>
      );
    }

    return (
      <div id={this.props.projId} className="project-edit-box">
        <div className="project-edit-container">
          <img
            className="project-edit-image"
            alt={data.name}
            src={
              data.images.length === 0 ||
              data.images === undefined ||
              data.images === null
                ? require('./assets/imagePlaceholder.jpg')
                : data.images[0]
            }
          />
          <div className="project-edit-info">
            <div className="project-name">{data.name}</div>
            <div className="project-description">{data.description}</div>
            <div className="project-tags">
              {category}
              {tags}
            </div>
            <div className="project-roles-needed">
              looking for
              <div className="project-roles">{roles}</div>
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
