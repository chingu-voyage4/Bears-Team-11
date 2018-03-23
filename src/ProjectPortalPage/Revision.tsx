import * as React from 'react';

class Revision extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="carousel__revision">
        <div>
          <img src="http://via.placeholder.com/350x150" alt="" />
          <div>3</div>
        </div>
        <h3>Revision 3 - Changes to header</h3>
        <p>author: lilganewolf | date: 11/28/2017</p>
        <span>Final Version</span>
      </div>
    );
  }
}

export default Revision;
