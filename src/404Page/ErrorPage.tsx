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
    return (
      <div className="error-page-container">
        <img className="error-image" src={require('../assets/404-03.png')} />
        <button className="error-goBack-btn" onClick={this.goBack}>
          Go Back
        </button>
      </div>
    );
  }
}

export default ErrorPage;
