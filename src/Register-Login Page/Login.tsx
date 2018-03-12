import * as React from 'react';
import '../styles/Register-Login.css';
import { State } from '../types/Login.d';
import { LoginProps } from '../types/Redux.d';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';

class Login extends React.Component<LoginProps, State> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    this.props.login(this.state.email, this.state.password);
  };
  render() {
    return (
      <div className="popupScreen">
        <br />

        <div className="logo">project match</div>

        <br />

        <img
          className="extAuthIcon"
          src={require('../assets/google icon.png')}
        />
        <button className="extAuthBtn">Sign in with Google</button>

        <br />

        <hr className="horizontalDivider" />

        <form>
          <label className="form-label">Your Email</label>
          <input
            className="emailDiv"
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
            placeholder="Email"
          />
          <br />
          <label className="form-label">Password</label>
          <input
            className="passwordDiv"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            placeholder="Password"
          />
          <br />
          <input
            type="submit"
            className="signUpBtn"
            value="Submit"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}

export default connect<{}, LoginProps, {}>(null, { login })(Login);
