/* tslint:disable */
import * as React from 'react';

class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <div className="comment-box__menu">
          <i className="far fa-times-circle" />
        </div>
        <div className="comment-box__header">
          <img
            className="comment-box__profile_picture"
            src="https://stroops.com/wp-content/uploads/2016/11/placeholder-profile-male-500x500.png"
            alt=""
          />
          <div>
            <p className="comment-box__name">
              natapot <span className="comment-box__timestamp">8:00am</span>
            </p>
            <p className="comment-box__body">
              Dislike Kaiju, please make it more cool.
            </p>
          </div>
        </div>

        <input className="comment-box__input" type="text" />
      </div>
    );
  }
}

export default CommentBox;
