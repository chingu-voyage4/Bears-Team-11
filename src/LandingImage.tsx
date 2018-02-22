import * as React from 'react';
import './styles/LandingImage.css';

class LandingImage extends React.Component {
  render() {
    return (
      <div className="landing-image-container">
        <div className="blue-sky green-grass">
          <h1 className="header">Get Project Matched!</h1>
          <img className="image" src={require('./assets/Landing_Image-02.png')} />
        </div>
      </div>
    );
  }
}

export default LandingImage;