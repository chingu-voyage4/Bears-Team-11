import { Link } from 'react-router-dom';
import * as React from 'react';
import './styles/Project.css';
import { ProjectForEditProps, State } from './types/Projects.d';
import { Store } from './types/Redux';
import { connect } from 'react-redux';

class ProjectForEdit extends React.Component<ProjectForEditProps, State> {
  constructor(props: ProjectForEditProps) {
    super(props);
  }

  public goToEditProjectPageHandler(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    var { id } = e.currentTarget;
    console.log(id);
    // retrieve projectId from project component
    // save to updateProject action
    // redirect to update Project data page
    // after save, set updateProject to null again
    // so a new instance of it will be "add project", not updating the same data
    // var projectId = e.currentTarget._id;
    // this.props.updateProject(projectId);
  }

  render() {
    var data = this.props.projects;

    var roles;
    if (data.lookingFor && data.lookingFor.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else if (data.lookingFor!.length === 1) {
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
              data.images === [] ||
              data.images![0] === undefined ||
              data.images![0] === null
                ? require('./assets/imagePlaceholder.jpg')
                : data.images![0]
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
            <button className="project-delete-btn">Delete Project</button>
          </div>
          <div />
          <div>
            <button className="project-edit-btn">Edit Project</button>
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

export default connect(mapStateToProps, {})(ProjectForEdit);
