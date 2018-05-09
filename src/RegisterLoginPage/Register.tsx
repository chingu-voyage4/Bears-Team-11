import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import { RegisterState } from '../types/Register.d';
import { RegisterProps } from '../types/Redux.d';
import { register } from '../actions/userActions';
import {
  showRegisterWindow,
  completeRegistration
} from '../actions/appActions';

import GoogleSignIn from '../GoogleSignIn';

import '../styles/Register-Login.css';

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      shouldRedirect: false
    };
  }

  public handleFormChange(e: React.FormEvent<HTMLInputElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    } as any);
  }

  public handleSubmit(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = this.state;

    this.props
      .register(firstName, lastName, username, email, password)
      .then(() => {
        this.props.completeRegistration();
      });
  }

  windowVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showRegisterWindow();
  };

  render() {
    return (
      <div className="registerPopupScreen">
        <form className="register-form">
          <br />
          <div className="logo-login_register">project match</div>
          <button
            className="login-register-exit-window-btn"
            onClick={e => this.windowVisibility(e)}
          >
            X
          </button>
          <br />

          <GoogleSignIn />

          <hr className="horizontalDivider" />

          <label className="form-label">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            required={true}
            className="nameDiv"
            onChange={e => this.handleFormChange(e)}
          />

          <label className="form-label">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            required={true}
            className="nameDiv"
            onChange={e => this.handleFormChange(e)}
          />

          <br />

          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required={true}
            className="usernameDiv"
            onChange={e => this.handleFormChange(e)}
          />

          <br />

          <label className="form-label">Your Email</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required={true}
            className="emailDiv"
            onChange={e => this.handleFormChange(e)}
          />

          <br />

          <label className="form-label">Password</label>
          <input
            id="pasword"
            type="password"
            placeholder="Password"
            name="password"
            required={true}
            className="passwordDiv"
            onChange={e => this.handleFormChange(e)}
          />

          <br />

          <button
            onClick={e => this.handleSubmit(e)}
            type="submit"
            className="signUpBtn"
            name="registerBtn"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    visibleRegisterWindow: state.registerLoginWindow.visibleRegisterWindow
  };
}

export default connect(mapStateToProps, {
  register,
  showRegisterWindow,
  completeRegistration
})(Register as any);
