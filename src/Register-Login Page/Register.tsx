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
    public handleSubmit(event: MouseEvent): void {
        this.setState({
            
        });
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
                    <input type="text" placeholder="Last Name" name="lastName" required={true} />

                    <br />

                    <label className="register-form-label">Your Email</label>
                    <input type="email" placeholder="Email Address" name="email" required={true} />

                    <br />

                    <label className="register-form-label">Password</label>
                    <input type="password" placeholder="Password" name="password" required={true}  />

                    <br />

                    <button type="submit" className="signUpBtn" name="registerBtn">Sign Up For Free</button>
                </form>
            </div>
        );
    }
}

export default Register;