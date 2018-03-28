import * as React from 'react';
import Revisions from './Revisions';

class Carousel extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <a className="upload-link" href="">
          upload new document
        </a>
        <Revisions />
      </React.Fragment>
    );
  }
}

export default Carousel;
