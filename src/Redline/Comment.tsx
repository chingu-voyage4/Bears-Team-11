import * as React from 'react';
import * as moment from 'moment';

interface CommentProps {
  username: string;
  message: string;
  time: string;
}

class Comment extends React.Component<CommentProps> {
  render() {
    return (
      <div className="comment-box__comment">
        <div>
          <p className="comment-box__name">
            {this.props.username}
            <span className="comment-box__timestamp">
              {moment(this.props.time).format('ll')}
            </span>
          </p>
          <p className="comment-box__body">{this.props.message}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
