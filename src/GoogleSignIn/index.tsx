// ref: https://developers.google.com/identity/sign-in/web/sign-in

/* tslint:disable */
declare global {
  interface Window {
    gapi: any;
  }
}

import * as React from 'react';

class GoogleSignIn extends React.Component {
  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      scope: 'https://www.googleapis.com/auth/plus.login',
      width: 240,
      height: 50,
      longtitle: false,
      theme: 'light',
      onsuccess: this.onSignIn,
      onFailture: this.onFailure
    });
  }

  onSignIn = (googleUser: any): void => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    // Pass ID token to backend and verify with serverside secret
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);
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
      <div>
        <div id="g-signin2" />;
        <a href="#" onClick={this.signOut}>
          Sign out
        </a>
      </div>
    );
  }
}

export default GoogleSignIn;
