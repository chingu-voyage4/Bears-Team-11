/* tslint:disable */
import * as React from 'react';

class CommentBox extends React.Component {
  render() {
    return (
      <div className="commentbox">
        <div className="commentbox__header">
          <img
            className="commentbox__profile_picture"
            src="https://stroops.com/wp-content/uploads/2016/11/placeholder-profile-male-500x500.png"
            alt=""
          />
          <p className="commentbox__name">
            natapot <span className="commentbox__timestamp">8:00am</span>
          </p>
        </div>
        <p className="commentbox-body">
          Dislike Kaiju, please make it more cool.
        </p>
      </div>
    );
  }
}

export default CommentBox;
