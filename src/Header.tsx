import * as React from 'react';
import './styles/Header.css';

class Header extends React.Component {

    render() {

        return (
            <div>
                <div className="container">
                    <div className="title">
                        <h1>project match</h1>
                    </div>
                    <div className="login">
                    <a href="#"><h2 className="loginText">Log In</h2></a>
                    </div>
                    <div className="signUp">
                    <button><h2 className="signUpText">Sign Up For Free</h2></button>
                    </div>
            </div>
            </div>
        );
    }

}

export default Header;