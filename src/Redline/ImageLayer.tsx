/* tslint: disable */
import * as React from 'react';

interface ImageLayerProps {
  imageLink: string;
}

class ImageLayer extends React.Component<ImageLayerProps> {
  render() {
    return (
      <div className="redline-image-container">
        <img className="redline-image" src={this.props.imageLink} alt="" />
      </div>
    );
  }
}

export default ImageLayer;
