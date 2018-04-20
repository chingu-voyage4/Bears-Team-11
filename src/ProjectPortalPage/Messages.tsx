import * as React from 'react';
import Message from './Message';

class Messages extends React.PureComponent<
  {
    comments: Array<string> | undefined | string;
  },
  {}
> {
  generateMessageList = () => {
    if (this.props.comments) {
      const comments = this.props.comments as Array<string>;
      return comments.map((comment: string) => {
        // TODO: add an ID property to comments, they also need user, time created, and message properties
        return <Message key={Math.random().toString()} />; // temp workaround
      });
    }
    return null;
  };

  // TODO: render a placeholder component if there are no messages
  render() {
    return (
      <div className="messages">
        {this.props.comments && this.props.comments.length > 0 ? (
          <ul>{this.generateMessageList()}</ul>
        ) : null}
      </div>
    );
  }
}

export default Messages;
