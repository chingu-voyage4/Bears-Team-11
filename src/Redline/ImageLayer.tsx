/* tslint: disable */
import * as React from 'react';

class ImageLayer extends React.Component<{ imageLink: string }> {
  render() {
    return (
      <div className="redline-image-container">
        <img className="redline-image" src={this.props.imageLink} alt="" />
      </div>
    );
  }
}

export default ImageLayer;
