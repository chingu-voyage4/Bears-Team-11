import * as React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import About from './About';
import Chat from './Chat';
import Revisions from './Revisions';
import '../styles/ProjectPortalPage.css';
import apiService from '../utils/apiService';

interface ProjectPortalPageProps {
  match: { params: { id: string } };
}

interface ProjectPortalPageState {
  currentProject: any;
}

class ProjectPortalPage extends React.Component<
  ProjectPortalPageProps,
  ProjectPortalPageState
> {
  constructor(props: ProjectPortalPageProps) {
    super(props);
    this.state = {
      currentProject: {}
    };
  }

  componentDidMount() {
    const id = this.getURLParams().id;
    apiService.getProject(id).then(project => {
      this.setState({
        currentProject: project
      });
    });
  }

  getURLParams = () => {
    return this.props.match.params;
  };

  render() {
    if (this.state.currentProject._id) {
      return (
        <div className="project-portal__container">
          <HeaderContainer />
          <div className="project-portal__carousel__background">
            <div className="project-portal__carousel">
              <Revisions
                mockups={this.state.currentProject.mockups}
                projectId={this.state.currentProject._id}
              />
            </div>
          </div>
          <div className="project-portal__info">
            <div className="project-portal__about">
              <About
                projectId={this.state.currentProject._id}
                name={this.state.currentProject.name}
                dueDate={this.state.currentProject.dueDate}
                description={this.state.currentProject.description}
                githubLink={this.state.currentProject.githubLink}
                liveLink={this.state.currentProject.liveLink}
                lookingFor={this.state.currentProject.lookingFor}
                mockupLink={this.state.currentProject.mockupLink}
                status={this.state.currentProject.status}
              />
            </div>
            <div className="project-portal__chat">
              <Chat projectId={this.state.currentProject._id} />
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="loader" />;
    }
  }
}

export default ProjectPortalPage;
