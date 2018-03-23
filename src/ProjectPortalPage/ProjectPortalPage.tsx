import * as React from 'react';
import Header from '../Header';
import About from './About';
import Chat from './Chat';
import Carousel from './Carousel';

class ProjectPortalPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="project-portal__container">
        <Header />
        <div className="projtect-portal__carousel">
          <Carousel />
        </div>
        <div className="project-portal__about">
          <About />
        </div>
        <div className="project-portal__chat">
          <Chat />
        </div>
      </div>
    );
  }
}

export default ProjectPortalPage;
