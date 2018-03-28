import * as React from 'react';
import Messages from './Messages';

class Chat extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <Messages />
        <input
          className="message-input"
          type="text"
          placeholder="Type something..."
        />
      </React.Fragment>
    );
  }
}

export default Chat;
