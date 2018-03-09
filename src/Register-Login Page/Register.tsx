import * as React from 'react';
import { State, Props, PassedProps } from '../types/Register.d';
import '../styles/Register-Login.css';

class Register extends React.Component<PassedProps, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: ''
        };
    }

    public handleChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    }

    render() {
        return (
            <div className="registerPopupScreen">
                <form className="register-form" action="http://localhost:8080/signup" method="post">
                    <br />
                    <div className="logo">project match</div>
                    <br />
                    <img className="extAuthIcon" src={require('../assets/google icon.png')} />
                    <button type="button" className="extAuthBtn">
                        Sign up with Google
                    </button>

                    <br />

                    <hr className="horizontalDivider"/>

                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        required={true}
                        className="nameDiv"
                        onChange={e => this.handleChange(e)}
                    />

                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        required={true}
                        className="nameDiv"
                        onChange={e => this.handleChange(e)}
                    />

                    <br />

                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        required={true}
                        className="usernameDiv"
                        onChange={e => this.handleChange(e)}
                    />

                    <br />

                    <label className="form-label">Your Email</label>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required={true}
                        className="emailDiv"
                        onChange={e => this.handleChange(e)}
                    />

                    <br />

                    <label className="form-label">Password</label>
                    <input
                        id="pasword"
                        type="password"
                        placeholder="Password"
                        className="passwordDiv"
                        minLength={8}
                        name="password"
                        required={true}
                        onChange={e => this.handleChange(e)}
                    />

                    <br />

                    <button
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

export default Register;