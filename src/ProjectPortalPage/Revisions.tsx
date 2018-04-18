import * as React from 'react';
import Revision from './Revision';

class Revisions extends React.PureComponent<
  { mockups: Array<string> | undefined },
  {}
> {
  render() {
    return (
      <React.Fragment>
        <div className="upload-link__container">
          <a className="upload-link" href="">
            upload new document <i className="fas fa-cloud-upload-alt fa-2x" />
          </a>
        </div>
        <div className="revisions-list">
          <Revision />
          <Revision />
          <Revision />
          <Revision />
        </div>
      </React.Fragment>
    );
  }
}

export default Revisions;
