import * as React from 'react';
import * as moment from 'moment';

class Comment extends React.Component<{
  username: string;
  message: string;
  time: string;
}> {
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
