import * as React from 'react';
import '../styles/ReadyToTry.css';

class ReadyToTry extends React.Component {
  render() {
    return (
      <div className="ready-to-try-container">
         <h1 className="ready-to-try-text">Ready to try Project Match?</h1>
         <button className="ready-to-try-button">SIGN UP FOR FREE</button>
      </div>
    );
  }
}

export default ReadyToTry;