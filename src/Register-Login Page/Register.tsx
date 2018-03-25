import * as React from 'react';
import { RegisterState } from '../types/Register.d';
import { RegisterProps } from '../types/Redux.d';
import { register } from '../actions/userActions';
import { connect } from 'react-redux';
import '../styles/Register-Login.css';
import { GoogleSignIn } from '../GoogleSignIn/index';

class Register extends React.Component<RegisterProps, RegisterState> {
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

  public handleFormChange(e: React.FormEvent<HTMLInputElement>): void {
    var { name, value } = e.currentTarget;

    /*
     * There is a current bug in typescript that does not correctly identify the string literal
     * type in a computed property key.
     * 
     * ref: https://github.com/Microsoft/TypeScript/issues/15534
     * ref: https://github.com/Microsoft/TypeScript/issues/13948
     * ref: https://github.com/Microsoft/TypeScript/pull/21070
     */
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  }

  public handleSubmit(e: React.FormEvent<HTMLButtonElement>): void {
    const { firstName, lastName, email, password } = this.state;
    this.props.register(firstName, lastName, email, password);
  }

  render() {
    return (
      <div className="registerPopupScreen">
        <form className="register-form">
          <br />
          <div className="logo-login_register">project match</div>

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
            onChange={this.handleFormChange}
          />

          <label className="form-label">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            required={true}
            className="nameDiv"
            onChange={this.handleFormChange}
          />

          <br />

          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required={true}
            className="usernameDiv"
            onChange={this.handleFormChange}
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
            value={this.state.password}
            type="password"
            placeholder="Password"
            name="password"
            required={true}
            className="passwordDiv"
            onChange={this.handleFormChange}
          />

          <br />

          <button
            onClick={this.handleSubmit}
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
