import * as React from 'react';

class Message extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="message">
        <img
          className="message__thumbnail"
          src="https://placeimg.com/50/50/people"
          alt=""
        />
        <div className="message__body">
          <h3 className="message__sender">
            lilgangwolf <span className="message__time">8:06am</span>
          </h3>
          <p className="message__text">
            The updated mockup has been uploaded. Please give me any feedback
            within the portals editor.
          </p>
        </div>
      </div>
    );
  }
}

export default Message;
