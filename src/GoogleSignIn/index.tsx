import { googleLogin } from '../actions/userActions';
import { connect } from 'react-redux';
import * as React from 'react';
import { GoogleProps } from '../types/GoogleLogin.d';
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
    // let auth2 = window.gapi.auth2.init({
    //   client_id:
    //     '634604962663-247j6obodp1clln54de1469euufj6vdj.apps.googleusercontent.com'
    // });

    // var profile = auth2.currentUser.get().getBasicProfile();
    // console.log('ID: ' + profile.getId());
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());

    // Pass ID token to backend and verify with serverside secret
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log('ID Token: ' + id_token);
    this.props.googleLogin(id_token);
  };

  onFailure = (error: any): void => {
    console.log(error);
  };

  signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('User signed out.');
    });
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
