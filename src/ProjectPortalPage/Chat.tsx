import * as React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../.config';

interface ChatProps {
  projectId: string;
  user: any;
}

interface ChatState {
  comments: Array<any>;
  message: string;
  team: Array<string>;
}

class Chat extends React.PureComponent<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      message: '',
      comments: [],
      team: []
    };
  }
  componentDidMount() {
    axios
      .get(config.host.name + `/api/projects/${this.props.projectId}/comments`)
      .then(response => {
        var comments = response.data.comments;
        this.setState({
          comments
        });

        this.scrollToBottom();
      });

    axios
      .get(config.host.name + `/api/projects/${this.props.projectId}/team`)
      .then(response => {
        var team = response.data.team;
        this.setState({ team });
      });
  }
  handleSubmit = (e: any) => {
    if (e.which === 13) {
      this.addComment(this.state.message);
      this.setState({ message: '' });
    }
  };

  handleClickSend = (e: any) => {
    e.preventDefault();
    if (this.isTeamMember()) {
      this.addComment(this.state.message);
    }
  };

  handleChange = (e: any) => {
    this.setState({ message: e.currentTarget.value });
  };

  addComment = (comment: any) => {
    axios
      .post(
        config.host.name + `/api/projects/${this.props.projectId}/comment`,
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

  isTeamMember = () => {
    if (this.props.user._id && this.state.team) {
      return this.state.team.some(teammember => {
        return teammember === this.props.user.username;
      });
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="messages" className="messages">
          {this.state.comments.length > 0
            ? this.displayMessages()
            : 'Start A Conversation'}
        </div>
        <div className="message-bar">
          <input
            className="message-input"
            type="text"
            placeholder={
              this.isTeamMember()
                ? 'Type something...'
                : 'You must be a part of this team...'
            }
            onKeyPress={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.message}
            disabled={this.isTeamMember() ? false : true}
          />
          <a className="message-send" onClick={this.handleClickSend}>
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
