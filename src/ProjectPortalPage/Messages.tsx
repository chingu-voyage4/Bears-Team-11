import * as React from 'react';
import Message from './Message';

class Messages extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Message />
          </li>
          <li>
            <Message />
          </li>
          <li>
            <Message />
          </li>
        </ul>
      </div>
    );
  }
}

export default Messages;
