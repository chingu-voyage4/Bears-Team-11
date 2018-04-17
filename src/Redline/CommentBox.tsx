/* tslint:disable */
import * as React from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import { addComment } from '../actions/markerActions';

class CommentBox extends React.Component<{
  markerId: string;
  comments: Array<{ user: string; time: string; message: string }>;
  addComment: any;
}> {
  handleKeyPress = (e: any) => {
    console.log(e.keyCode);
    if (e.keyCode === 13 || e.which == 13) {
      // enter key is pressed
      // BUG: this should cause component to re-render because props should have been updated
      this.props.addComment(this.props.markerId, {
        user: 'steampot',
        time: '9:00am',
        message: 'ok'
      });
    }
  };
  renderComments = () => {
    if (this.props.comments) {
      return this.props.comments.map(comment => {
        return <Comment key={Math.random()} {...comment} />;
      });
    }
    return null;
  };

  render() {
    return (
      <div className="comment-box" style={{ display: 'none' }}>
        {this.renderComments()}
        <input
          className="comment-box__input"
          type="text"
          onKeyDown={this.handleKeyPress}
        />
      </div>
    );
  }
}

function mapStateToProps(state: Store, ownProps: any) {
  var comments;
  for (var i = 0; i < state.markers.length; i++) {
    if (state.markers[i].id === ownProps.markerId) {
      comments = state.markers[i].comments;
    }
  }
  return {
    comments,
    markerId: ownProps.markerId
  };
}

export default connect(mapStateToProps, { addComment })(CommentBox);
