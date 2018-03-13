import * as React from 'react';
import '../styles/Register-Login.css';
import { State } from '../types/Login.d';
import { LoginProps } from '../types/Redux.d';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';

<<<<<<< HEAD
// for Google Auth
import { GoogleLogin } from 'react-google-login';

const fetch = require('isomorphic-fetch');
/* tslint:disable-next-line */
const responseGoogle = (response:any) => {
    /* tslint:disable-next-line */
    console.log(response.googelid);
    alert('Yor are succefully logged in' + response.googelid);
  };

class Login extends React.Component<PassedProps, State> {
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
    }
=======
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
>>>>>>> 4ed8682411a815ae7d3720712f4a324b05281132

        <div className="logo">project match</div>

        <br />

<<<<<<< HEAD
        var apiBaseUrl = 'http://localhost:8080/login';
=======
        <img
          className="extAuthIcon"
          src={require('../assets/google icon.png')}
        />
        <button className="extAuthBtn">Sign in with Google</button>
>>>>>>> 4ed8682411a815ae7d3720712f4a324b05281132

        <br />

        <hr className="horizontalDivider" />

<<<<<<< HEAD
        fetch(apiBaseUrl, data)
            /* tslint:disable-next-line */
            .then(function (response: any) {
                if (response.status === 200) {
                    alert('User Logged In');
                } else if (response.status === 204) {
                    alert('Username password do not match');
                } else {
                    alert('Status Code: ' + response.status + ' - ' + response.statusText);
                }
            })
            /* tslint:disable-next-line */
            .catch(function (error: any) {
                alert(error);
            });
    }
    render() {
        return (
            <div className="popupScreen">
                <br />
                <div className="logo">project match</div>
                <br />
                <button className="extAuthBtn">
                    <img className="extAutIcon" src={require('../assets/google icon.png')} />

                    <GoogleLogin
                        clientId="634604962663-nis01un3inph896c1unjj53l8o3pmjho.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                    </button>
                <br />
                <button className="extAuthBtn">
                    <img className="extAutIcon" src={require('../assets/facebook icon.png')} />
                    Sign in with Facebook
                    </button>
                <br />
                <button className="extAuthBtn">
                    <img className="extAutIcon" src={require('../assets/chingu icon.png')} />
                    Sign in with Chingu
                    </button>
                <hr />
                <form>
                    <input
                        className="emailDiv"
                        type="email"
                        name="email"
                        value={this.state.Email}
                        onChange={e => this.handleEmail(e)}
                        placeholder="Email"
                    />
                    <br />
                    <input
                        className="passwordDiv"
                        type="password"
                        name="password"
                        value={this.state.Password}
                        onChange={e => this.handlePassword(e)}
                        placeholder="Password"
                    />
                    <br />
                    <input type="submit" value="Submit" onClick={e => this.handleSubmit(e)} />
                </form>
            </div>
        );
    }
=======
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
>>>>>>> 4ed8682411a815ae7d3720712f4a324b05281132
}

export default connect<{}, LoginProps, {}>(null, { login })(Login);
