import * as React from 'react';
import './styles/Header.css';
import { PassedProps, State, Props } from './types/Header.d';

const fetch = require('isomorphic-fetch');
class Header extends React.Component<PassedProps, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            loginScreen: false,
            Email: '',
            Password: ''
        };
        this.loginPressed = this.loginPressed.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            Email: e.currentTarget.value
        });
    }

    handlePassword(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            Password: e.currentTarget.value
        });
    }

    handleSubmit(e: React.FormEvent<HTMLButtonElement>): void {
        var apiBaseUrl = 'http://localhost:8080/api/v1/user/login';
        var payload = {
            username: this.state.Email,
            password: this.state.Password
        };

        let data = {
            method: 'POST',
            body: payload,
            headers: new Headers()
        };

        fetch(apiBaseUrl, data)
            /* tslint:disable-next-line */
            .then(function (response: any) {
                if (response.status === 200) {
                    alert('good job');
                } else if (response.status === 204) {
                    alert('Username password do not match');
                } else {
                    alert(response.status);
                }
            })
            /* tslint:disable-next-line */
            .catch(function (error: any) {
                alert(error);
            });
    }

    loginPressed(): void {
        this.setState({
            loginScreen: !this.state.loginScreen
        });
    }

    render() {
        const login = (
            <div className="loginScreen">
                <br />
                <div className="logo">project match</div>
                <br />
                <button className="extAuthBtn">
                    <img className="extAutIcon" src={require('./assets/google icon.png')} />
                    Sign in with Google
                </button>
                <br />
                <button className="extAuthBtn">
                    <img className="extAutIcon" src={require('./assets/facebook icon.png')} />
                    Sign in with Facebook
                </button>
                <br />
                <button className="extAuthBtn">
                    <img className="extAutIcon" src={require('./assets/chingu icon.png')} />
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
        return (
            <div>
                <div className="header-container">
                    <h1>EmailState:{this.state.Email} PasswordState:{this.state.Password}</h1>
                    {this.state.loginScreen === true ? login : null}

                    <div className="logo">project match</div>
                    <div className="login">
                        <button onClick={this.loginPressed} className="loginText">LOG IN</button>
                    </div>
                    <div className="signUp">
                        <button className="signUpButton">
                            <h2 className="signUpText">SIGN UP FOR FREE</h2></button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;