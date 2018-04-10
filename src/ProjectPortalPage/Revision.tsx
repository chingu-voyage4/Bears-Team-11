import * as React from 'react';

class Revision extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="revision">
        <div className="revision__image_container">
          <img src="http://via.placeholder.com/350x150" alt="" />
          <div className="revision__changes">3</div>
        </div>
        <h3 className="revision__title">Revision 3 - Changes to header</h3>
        <p className="revision__author">
          author: lilganewolf | date: 11/28/2017
        </p>
        <span className="revision__version">Final Version</span>
      </div>
    );
  }
}

export default Revision;
