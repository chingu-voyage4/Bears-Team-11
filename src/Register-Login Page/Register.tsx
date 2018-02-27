import * as React from 'react';
import { State, Props, PassedProps } from '../types/Register';
import '../styles/Header.css';

class Register extends React.Component<PassedProps, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    }

    public handleFirstNameChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ firstName: e.currentTarget.value });
    }

    public handleLastNameChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ lastName: e.currentTarget.value });
    }

    public handleEmailChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ email: e.currentTarget.value });
    }

    public handlePasswordChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ password: e.currentTarget.value });
    }

    public handleSubmit(e: React.FormEvent<HTMLButtonElement>): void {
        this.setState({});
    }
    render() {
        return (
            <div className="register-page">
                <form className="register-form">
                    <div className="register-title">project match</div>
                    <label className="register-form-label">First Name</label>
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="firstName" 
                        required={true} 
                        onChange={e => this.handleFirstNameChange(e)} 
                    />

                    <label className="register-form-label">Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="lastName" 
                        required={true} 
                        onChange={e => this.handleLastNameChange(e)}
                    />

                    <br />

                    <label className="register-form-label">Your Email</label>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        required={true} 
                        onChange={e => this.handleEmailChange(e)}
                    />

                    <br />

                    <label className="register-form-label">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        required={true}  
                        onChange={e => this.handlePasswordChange(e)}
                    />

                    <br />

                    <button type="submit" className="signUpBtn" name="registerBtn">Sign Up For Free</button>
                </form>
            </div>
        );
    }
}

export default Register;