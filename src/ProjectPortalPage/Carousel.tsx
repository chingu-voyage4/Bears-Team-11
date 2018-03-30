import * as React from 'react';
import Revisions from './Revisions';

class Carousel extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <a className="upload-link" href="">
          upload new document <i className="fas fa-cloud-upload-alt fa-2x" />
        </a>
        <Revisions />
      </React.Fragment>
    );
  }
}

export default Carousel;
