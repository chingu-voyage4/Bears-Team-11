import * as React from 'react';
import '../styles/Header.css';
import { HeaderState } from '../types/Header.d';
import Login from '../RegisterLoginPage/Login';
import Register from '../RegisterLoginPage/Register';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { showRegisterWindow, showLoginWindow } from '../actions/appActions';
import { Store, HeaderProps, Action } from '../types/Redux';

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    showLoginWindow: () => {
      return dispatch(showLoginWindow());
    },
    showRegisterWindow: () => {
      return dispatch(showRegisterWindow());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
