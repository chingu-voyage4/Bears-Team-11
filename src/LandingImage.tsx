import * as React from 'react';
import './styles/LandingImage.css';

class LandingImage extends React.Component {
  render() {
    return (
      <div className="landing-image-container">
          <h1 className="header">Get Project Matched!</h1>
          <img className="image" src={require('./assets/Landing_Image-02.png')} />
      </div>
    );
  }
}

export default LandingImage;