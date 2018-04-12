/* tslint:disable */
import * as React from 'react';
import Comment from './Comment';

class CommentBox extends React.Component<{
  x: any;
  y: any;
  width?: any;
  height?: any;
}> {
  render() {
    return (
      <div className="comment-box">
        {/* need a menu ? */}
        {/* <div className="comment-box__menu">
          <i className="far fa-times-circle" />
        </div> */}

        <Comment />
        <Comment />
        <Comment />

        <input className="comment-box__input" type="text" />
      </div>
    );
  }
}

export default CommentBox;
