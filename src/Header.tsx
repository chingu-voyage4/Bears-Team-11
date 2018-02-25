import * as React from 'react';
import './styles/Header.css';

class Header extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
          loginScreen: false
        };
        this.loginPressed = this.loginPressed.bind(this);
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
            <div>
            <h1 className="loginScreen-header">project match</h1>
            </div>
            <div>
            <button className="loginScreen-button-google">Sign in with Google</button>
            </div>
            <div>
            <button className="loginScreen-button-facebook">Sign in with Facebook</button>
            </div>
            <form>
            <div className="usernameDiv">
            <input type="text" name="username" placeholder="Email" />
            </div>
            <div className="passwordDiv">
            <input type="text" name="password" placeholder="Password" />
            </div>
            <input type="submit" value="Submit" />
            </form>
            </div>
            </div>
        );
        return (
            <div>
                <div className="header-container">
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