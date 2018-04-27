import * as React from 'react';

class Comment extends React.Component<{
  user: string;
  message: string;
  time: string;
}> {
  render() {
    return (
      <div className="comment-box__comment">
        <img
          className="comment-box__profile_picture"
          src="https://stroops.com/wp-content/uploads/2016/11/placeholder-profile-male-500x500.png"
          alt=""
        />
        <div>
          <p className="comment-box__name">
            {this.props.user}
            <span className="comment-box__timestamp">{this.props.time}</span>
          </p>
          <p className="comment-box__body">{this.props.message}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
