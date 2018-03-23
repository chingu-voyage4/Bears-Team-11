import * as React from 'react';

class Message extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <div className="photo">
          <img src="https://placeimg.com/50/50/people" alt="" />
        </div>
        <div>
          <h3>
            lilgangwolf <span>8:06am</span>
          </h3>
          <p>message here</p>
        </div>
      </div>
    );
  }
}

export default Message;
