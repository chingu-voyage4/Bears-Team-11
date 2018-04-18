import * as React from 'react';
import Header from '../Header';
import About from './About';
import Chat from './Chat';
import Carousel from './Carousel';
import '../styles/ProjectPortalPage.css';
import { connect } from 'react-redux';
import { getProject } from '../actions/projectActions';
import { Dispatch } from 'redux';
import { Action, Store } from '../types/Redux';
import { Project } from '../types/Projects';

class ProjectPortalPage extends React.Component<
  {
    currentProject: Project;
    match: { params: { id: string } };
    getProject: (projectId: string) => (dispatch: Dispatch<Action>) => void;
  },
  {}
> {
  componentDidMount() {
    const id = this.getURLParams().id;
    this.props.getProject(id);
  }

  getURLParams = () => {
    return this.props.match.params;
  };

  render() {
    return (
      <div className="project-portal__container">
        <Header />
        <div className="project-portal__carousel__background">
          <div className="project-portal__carousel">
            <Carousel />
          </div>
        </div>
        <div className="project-portal__info">
          <div className="project-portal__about">
            <About />
          </div>
          <div className="project-portal__chat">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    currentProject: state.currentProject
  };
}

export default connect(mapStateToProps, { getProject })(ProjectPortalPage);
