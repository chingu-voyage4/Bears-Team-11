import * as React from 'react';
import '../styles/FlashMessage.css';

class FlashMessage extends React.Component<
  { title?: string; message?: string },
  {}
> {
  static defaultProps: any = {
    title: 'Sucesss!',
    message: 'This is a flash message'
  };

  dismissMessage = (e: any) => {
    e.preventDefault();
    var container = e.currentTarget.parentElement;
    container.style.display = 'none';
  };

  render() {
    return (
      <div className="flash__container">
        <h2 className="flash__title">{this.props.title}</h2>
        <p className="flash__message">{this.props.message}</p>
        <a className="flash__dismiss" href="" onClick={this.dismissMessage}>
          CLOSE
        </a>
      </div>
    );
  }
}

export default FlashMessage;
