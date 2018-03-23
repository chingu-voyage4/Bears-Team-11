import * as React from 'react';
import './styles/Header.css';
import { PassedProps, State, Props } from './types/Header.d';
import Login from './Register-Login Page/Login';
import Register from './Register-Login Page/Register';
// import { BrowserRouter as Route } from 'react-router-dom';
class Header extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loginScreen: false,
      registerScreen: false
    };
  }

  loginPressed = () => {
    this.setState({
      loginScreen: !this.state.loginScreen
    });
  };

  registerPressed = () => {
    this.setState({
      registerScreen: !this.state.registerScreen
    });
  };

  render() {
    return (
      <div className="header-color-container">
        <div className="header-container">
          {/* controls login and register popup windows */}
          {this.state.loginScreen === true ? <Login /> : null}
          {this.state.registerScreen === true ? <Register /> : null}

          <div className="logo">project match</div>
          <div className="login">
            <button onClick={this.loginPressed} className="loginText">
              LOG IN
            </button>
          </div>
          <div className="signUp">
            <button onClick={this.registerPressed} className="signUpButton">
              <h2 className="signUpText">SIGN UP FOR FREE</h2>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
