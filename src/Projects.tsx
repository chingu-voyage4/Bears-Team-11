import * as React from 'react';
import './styles/Project.css';
import {
  State,
  Props,
  ProjectsState,
  ProjectsInheritedProps
} from './types/Projects.d';
import { Store } from './types/Redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectForEdit from './ProjectContainerForSettings';

class Project extends React.Component<Props, State> {
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
      <div className="project">
        <img
          className="project-image"
          alt={data.name}
          // src="https://s3.us-east-2.amazonaws.com/project-match/project/5ada5b2132bf984d80ebc697/1524525889261.jpeg"
          src={
            data.images === [] ||
            data.images![0] === undefined ||
            data.images![0] === null
              ? require('./assets/imagePlaceholder.jpg')
              : data.images![0]
          }
        />
        <div className="project-info">
          <div className="project-name">{data.name}</div>
          <div className="project-description">{data.description}</div>
          {/* <div className="project-category">{category}</div> */}
          <div className="project-tags">
            {category}
            {tags}
          </div>
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

  render() {
    var projectComponent;
    var projectArray = this.props.projects;

    if (projectArray === undefined) {
      projectComponent = null;
    } else if (
      projectArray.length === 1 ||
      Array.isArray(projectArray) === false
    ) {
      projectComponent = (
        <Project key={'projects_1'} project={projectArray[0]} />
      );
    } else if (this.props.arrayOfProjects === 'settings') {
      projectArray.filter(project => {
        // will need to adjust to check for user in teams
        return project.creator === this.props.user.username;
      });
      return projectArray.map(function(projectData: any, index: number) {
        return (
          <ProjectForEdit
            key={'projects_Edit_' + index}
            projId={projectData._id}
          />
        );
      });
    } else if (projectArray) {
      projectComponent = projectArray.map(function(
        projectData: any,
        index: number
      ) {
        return <Project key={'projects_' + index} project={projectData} />;
      });
    }

    return <div className="projects-container">{projectComponent}</div>;
  }
}

const mapStateToProps = (state: Store) => {
  return {
    user: state.user,
    projects: state.projects,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, {})(Projects);
