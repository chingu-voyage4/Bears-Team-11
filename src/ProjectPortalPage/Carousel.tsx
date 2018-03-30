import * as React from 'react';
import Revisions from './Revisions';

class Carousel extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <div className="upload-link__container">
          <a className="upload-link" href="">
            upload new document <i className="fas fa-cloud-upload-alt fa-2x" />
          </a>
        </div>
        <Revisions />
      </React.Fragment>
    );
  }
}

export default Carousel;
