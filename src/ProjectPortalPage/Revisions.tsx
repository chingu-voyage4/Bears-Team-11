import * as React from 'react';
import Revision from './Revision';

class Revisions extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="revisions-list">
        <Revision />
        <Revision />
        <Revision />
        <Revision />
      </div>
    );
  }
}

export default Revisions;
