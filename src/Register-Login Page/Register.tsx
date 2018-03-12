// FS initial comment from newBranch

import * as React from 'react';
import { State } from '../types/Register.d';
import { RegisterProps } from '../types/Redux.d';
import { register } from '../actions/userActions';
import { connect } from 'react-redux';
import '../styles/Register-Login.css';

class Register extends React.Component<RegisterProps, State> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: ''
    };
  }

  public handleFirstNameChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ firstName: e.currentTarget.value });
  }

  public handleLastNameChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ lastName: e.currentTarget.value });
  }

  public handleUsernameChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ username: e.currentTarget.value });
  }

  public handleEmailChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ email: e.currentTarget.value });
  }

  public handlePasswordChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ password: e.currentTarget.value });
  }

  public handleSubmit(e: React.FormEvent<HTMLButtonElement>): void {
    const { firstName, lastName, email, password } = this.state;
    this.props.register(firstName, lastName, email, password);
  }

  render() {
    let inputStyle = {
      border: '1px solid black',
      color: 'black'
    };
    if (this.state.password.length > 8) {
      inputStyle = {
        border: '3px solid red',
        color: 'red'
      };
    }
    return (
      <div className="registerPopupScreen">
        <form className="register-form">
          <br />
          <div className="logo">project match</div>
          <br />
          <img
            className="extAuthIcon"
            src={require('../assets/google icon.png')}
          />
          <button type="button" className="extAuthBtn">
            Sign up with Google
          </button>

          <br />

          <img
            className="extAuthIcon"
            src={require('../assets/facebook icon.png')}
          />
          <button className="extAuthBtn">Sign up with Facebook</button>

          <br />

          <img
            className="extAuthIcon"
            src={require('../assets/chingu icon.png')}
          />
          <button className="extAuthBtn">Sign up with Chingu</button>
          <hr className="horizontalDivider" />

          <label className="form-label">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            required={true}
            className="nameDiv"
            onChange={e => this.handleFirstNameChange(e)}
          />

          <label className="form-label">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            required={true}
            className="nameDiv"
            onChange={e => this.handleLastNameChange(e)}
          />

          <br />

          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required={true}
            className="usernameDiv"
            onChange={e => this.handleUsernameChange(e)}
          />

          <br />

          <label className="form-label">Your Email</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required={true}
            className="emailDiv"
            onChange={e => this.handleEmailChange(e)}
          />

          <br />

          <label className="form-label">Password</label>
          <input
            id="pasword"
            value={this.state.password}
            type="password"
            placeholder="Password"
            style={inputStyle}
            name="password"
            required={true}
            className="passwordDiv"
            onChange={e => this.handlePasswordChange(e)}
          />

          <br />

          <button
            onClick={e => this.handleSubmit(e)}
            type="submit"
            className="signUpBtn"
            name="registerBtn"
          >
            Sign Up For Free
          </button>
        </form>
      </div>
    );
  }
}

export default connect<{}, RegisterProps, {}>(null, { register })(Register);
