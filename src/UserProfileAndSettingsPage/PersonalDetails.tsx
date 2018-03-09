import * as React from 'react';

class PersonalDetails extends React.Component {
  render() {
    return (
      <div>
        <div className="info-container">
          <div className="settings-headers">
            <h1>Personal Stuff</h1>
          </div>
          <div className="settings-labels">
            <h3>Username:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-headers">
            <h1>Skills</h1>
          </div>
          <div className="settings-labels">
            <h3>Password:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-labels">
            <h3>Email:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-headers">
            <h1>Links</h1>
          </div>
          <div className="settings-labels">
            <h3>LinkedIn:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-labels">
            <h3>GitHub:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-labels">
            <h3>Portfolio:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-labels">
            <h3>Website:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-labels">
            <h3>Twitter:</h3>
            <textarea className="settings-textarea" />
          </div>
          <div className="settings-labels">
            <h3>Blog:</h3>
            <textarea className="settings-textarea" />
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalDetails;
