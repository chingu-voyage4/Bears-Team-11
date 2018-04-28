import { googleLogin } from '../actions/userActions';
import { connect } from 'react-redux';
import * as React from 'react';
import { GoogleProps } from '../types/Redux';
// ref: https://developers.google.com/identity/sign-in/web/sign-in

/* tslint:disable */
declare global {
  interface Window {
    gapi: any;
  }
}

export class GoogleSignIn extends React.Component<GoogleProps> {
  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      scope: 'https://www.googleapis.com/auth/plus.login',
      width: 325,
      height: 40,
      longtitle: false,
      theme: 'light',
      onsuccess: this.onSignIn,
      onFailture: this.onFailure
    });
  }

  onSignIn = (googleUser: any): void => {
    var id_token = googleUser.getAuthResponse().id_token;
    this.props.googleLogin(id_token);
  };

  onFailure = (error: any): void => {
    console.log(error);
  };

  signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {});
  };

  render() {
    return (
      <div className="extAuthBtn">
        <div id="g-signin2" />
      </div>
    );
  }
}

export default connect(null, { googleLogin })(GoogleSignIn);
