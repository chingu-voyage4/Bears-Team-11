import * as React from 'react';
import '../styles/Register-Login.css';
import { State } from '../types/Login.d';
import { Props } from '../types/Redux.d';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      Email: '',
      Password: ''
    };
  }
  handleEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      Email: e.currentTarget.value
    });
  };

  handlePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      Password: e.currentTarget.value
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    this.props.login(this.state.Email, this.state.Password);
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

        <img
          className="extAuthIcon"
          src={require('../assets/facebook icon.png')}
        />
        <button className="extAuthBtn">Sign in with Facebook</button>

        <br />

        <img
          className="extAuthIcon"
          src={require('../assets/chingu icon.png')}
        />
        <button className="extAuthBtn">Sign in with Chingu</button>

        <hr className="horizontalDivider" />

        <form>
          <label className="form-label">Your Email</label>
          <input
            className="emailDiv"
            type="email"
            name="email"
            value={this.state.Email}
            onChange={e => this.handleEmail(e)}
            placeholder="Email"
          />
          <br />
          <label className="form-label">Password</label>
          <input
            className="passwordDiv"
            type="password"
            name="password"
            value={this.state.Password}
            onChange={e => this.handlePassword(e)}
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

export default connect(null, { login })(Login);
