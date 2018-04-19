import * as React from 'react';
import Messages from './Messages';

class Chat extends React.PureComponent<
  { comments: Array<string> | undefined | string },
  {}
> {
  render() {
    return (
      <React.Fragment>
        <Messages {...this.props} />
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
