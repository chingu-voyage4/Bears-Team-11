import * as React from 'react';
import Messages from './Messages';

class Chat extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <Messages />
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
