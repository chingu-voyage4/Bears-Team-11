import * as React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import axios from 'axios';

class Chat extends React.PureComponent<
  {
    projectId: string;
    user: any;
  },
  {
    comments: Array<any>;
    message: string;
  }
> {
  constructor(props: { projectId: string; user: any }) {
    super(props);
    this.state = {
      message: '',
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

        this.scrollToBottom();
      });
  }
  handleSubmit = (e: any) => {
    if (e.which === 13) {
      this.addComment(this.state.message);
    }
  };

  handleChange = (e: any) => {
    this.setState({ message: e.currentTarget.value });
  };

  addComment = (comment: any) => {
    axios
      .post(
        `http://localhost:8080/api/projects/${this.props.projectId}/comment`,
        {
          username: this.props.user.username,
          comment
        }
      )
      .then(response => {
        this.setState(prevState => {
          var comments = prevState.comments.slice();
          comments.push(response.data.comment);
          return {
            comments
          };
        });

        this.scrollToBottom();
      });
  };

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

  scrollToBottom = () => {
    var messages = document.getElementById('messages');
    messages!.scrollTop = messages!.scrollHeight;
  };

  render() {
    return (
      <React.Fragment>
        <div id="messages" className="messages">
          {this.state.comments.length > 0
            ? this.displayMessages()
            : 'No messages'}
        </div>
        <div className="message-bar">
          <input
            className="message-input"
            type="text"
            placeholder={
              this.props.user.projects.some(
                (id: string) => id === this.props.projectId
              )
                ? 'Type something...'
                : 'You must be a part of this project...'
            }
            onKeyPress={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.message}
            disabled={
              this.props.user.projects.some(
                (id: string) => id === this.props.projectId
              )
                ? false
                : true
            }
          />
          <a className="message-send">
            <i className="far fa-paper-plane" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(Chat);
