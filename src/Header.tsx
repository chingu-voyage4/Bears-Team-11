import * as React from 'react';
import axios from 'axios';
import './styles/Header.css';
import { PassedProps, State, Props } from './types/Header.d';
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
        var apiBaseUrl = 'localhost:8080/api/v1/user/';

        var payload = {
            username: this.state.Email,
            password: this.state.Password
        };

        axios.post(apiBaseUrl + 'login', payload)
            /* tslint:disable-next-line */
            .then(function (response: any) {
                if (response.data.code === 200) {
                    alert('good job');
                } else if (response.data.code === 204) {
                    alert('Username password do not match');
                } else {
                    alert('Username does not exist');
                }
            })
            /* tslint:disable-next-line */
            .catch(function (error: any) {
                alert(error);
            });
    }

    loginPressed() {
        this.setState({
            loginScreen: !this.state.loginScreen
        });
    }

    render() {
        const login = (
            <div className="loginScreen">
                <div className="loginScreen-inner">
                    <div className="loginScreen-header">project match</div>
                    <button className="loginScreen-button-google">Sign in with Google</button>
                    <button className="loginScreen-button-facebook">Sign in with Facebook</button>
                    <form>
                        <input
                            className="emailDiv"
                            type="email"
                            name="email"
                            value={this.state.Email}
                            onChange={this.handleEmail}
                            placeholder="Email"
                        />
                        <input
                            className="passwordDiv"
                            type="password"
                            name="password"
                            value={this.state.Password}
                            onChange={this.handlePassword}
                            placeholder="Password"
                        />
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    </form>
                </div>
            </div>
        );
        return (
            <div>
                <div className="header-container">
                    <h1>EmailState:{this.state.Email} PasswordState:{this.state.Password}</h1>
                    {this.state.loginScreen === true ? login : null}
                    <div className="logo">
                        <h1>project match</h1>
                    </div>
                    <div className="login">
                        <a onClick={this.loginPressed}><h2 className="loginText">LOG IN</h2></a>
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