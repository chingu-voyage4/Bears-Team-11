import * as React from 'react';
import Message from './Message';
import axios from 'axios';

class Chat extends React.PureComponent<
  { projectId: string },
  {
    comments: Array<any>;
  }
> {
  constructor(props: { projectId: string }) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/projects/${this.props.projectId}/comments`
      )
      .then(response => {
        var comments = response.data.comments;
        this.setState({
          comments
        });
      });
  }
  displayMessages = () => {
    return this.state.comments.map(comment => {
      return (
        <Message
          key={comment._id}
          creator={comment.creator}
          createdAt={comment.createdAt}
          comment={comment.comment}
        />
      );
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="messages">
          {this.state.comments.length > 0
            ? this.displayMessages()
            : 'No messages'}
        </div>
        <div className="message-bar">
          <input
            className="message-input"
            type="text"
            placeholder="Type something..."
          />
          <a className="message-send">
            <i className="far fa-paper-plane" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
