import * as React from 'react';
import './styles/Header.css';
import { PassedProps, HeaderState } from './types/Header.d';
import Login from './Register-Login Page/Login';
import Register from './Register-Login Page/Register';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showRegisterWindow, showLoginWindow } from './actions/appActions';
import { Store } from './types/Redux';

class Header extends React.Component<PassedProps, HeaderState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      loginWindow: this.props.visibleLoginWindow,
      registerWindow: this.props.visibleRegisterWindow
    };
  }

  loginPressed = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showLoginWindow();
  };

  registerPressed = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showRegisterWindow();
  };

  render() {
    return (
      <div className="header-color-container">
        <div className="header-container">
          {/* controls login and register popup windows */}
          {this.props.visibleLoginWindow ? <Login /> : null}
          {this.props.visibleRegisterWindow ? <Register /> : null}

          <Link to="/" className="logo">
            project match
          </Link>
          <div className="login">
            <button onClick={e => this.loginPressed(e)} className="loginText">
              LOG IN
            </button>
          </div>
          <div className="signUp">
            <button onClick={this.registerPressed} className="signUpButton">
              SIGN UP FOR FREE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    visibleLoginWindow: state.registerLoginWindow.visibleLoginWindow,
    visibleRegisterWindow: state.registerLoginWindow.visibleRegisterWindow
  };
}

export default connect(mapStateToProps, {
  showRegisterWindow,
  showLoginWindow
})(Header);
