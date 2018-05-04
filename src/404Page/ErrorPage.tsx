import * as React from 'react';
import '../styles/ErrorPage.css';

class ErrorPage extends React.Component<any, any> {
  // static contextTypes = {
  //   router: () => true, // replace with PropTypes.object if you use them
  // };

  goBack = () => {
    history.back();
  };
  render() {
    console.log(history);
    return (
      <div className="error-page-container">
        <img className="error-image" src={require('../assets/404-03.png')} />
        {history.length > 2 ? (
          <button className="error-goBack-btn" onClick={this.goBack}>
            Go Back
          </button>
        ) : (
          <a href="https://www.projectmatch.me" className="back-btn">
            <button className="error-goBack-btn">Back to Project Match</button>
          </a>
        )}
      </div>
    );
  }
}

export default ErrorPage;
