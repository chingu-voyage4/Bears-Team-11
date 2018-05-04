import * as React from 'react';
import '../styles/LandingImage.css';
import { Link } from 'react-router-dom';
class LandingImage extends React.Component {
  render() {
    return (
      <div className="landing-image-container">
        <div className="blue-sky">
          <div className="landing-image-container-2">
            <div className="landing-text-block">
              <div className="landing-header">Get Project Matched!</div>
              <div className="landing-text landing-subtext">
                Programmers and designers use Project Match to find teammates
                for budding ideas. Project Match will help find you projects and
                then provide team collaboration tools to support mockup reviews.
              </div>
              <Link to="/projects" className="exploreProjectsBtn">
                EXPLORE PROJECTS
              </Link>
            </div>
            <img
              className="landing-image"
              src={require('../assets/Landing Image-02.png')}
            />
          </div>
        </div>
        <div className="green-grass" />
      </div>
    );
  }
}

export default LandingImage;
