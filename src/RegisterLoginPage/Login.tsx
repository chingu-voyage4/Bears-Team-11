import * as React from 'react';
import '../styles/Register-Login.css';
import { LoginState } from '../types/Login.d';
import { LoginProps } from '../types/Redux';
import { connect, Dispatch } from 'react-redux';
import { login } from '../actions/userActions';
import GoogleSignIn from '../GoogleSignIn';
import { showLoginWindow } from '../actions/appActions';
import { Store, Action } from '../types/Redux';
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  };

  handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  windowVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showLoginWindow();
  };
  render() {
    return (
      <div className="popupScreen">
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
            className="loginBtn"
            value="Log In"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}
function mapStateToProps(state: Store) {
  return {
    visibleLoginWindow: state.registerLoginWindow.visibleLoginWindow
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    showLoginWindow: () => {
      return dispatch(showLoginWindow());
    },
    login: (email: string, password: string) => {
      return dispatch(login(email, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
