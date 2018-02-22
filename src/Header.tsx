import * as React from 'react';
import './styles/Header.css';

class Header extends React.Component {

    render() {

        return (
            <div>
                <div className="header-container">
                    <div className="logo">
                        <h1>project match</h1>
                    </div>
                    <div className="login">
                        <a href="#"><h2 className="loginText">LOG IN</h2></a>
                    </div>
                    <div className="signUp">
                        <button className="signUpButton"><h2 className="signUpText">SIGN UP FOR FREE</h2></button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;