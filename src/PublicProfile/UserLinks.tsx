import * as React from 'react';

class UserLinks extends React.Component<{ user: any }, {}> {
  render() {
    var user = this.props.user;
    var renderedLinks;
    var imageLinks = {
      linkedInLink: require('../assets/icons8-linkedin-48.png'),
      githubLink: require('../assets/icons8-github-50.png'),
      portfolioLink: require('../assets/icons8-business-filled-50.png'),
      websiteLink: require('../assets/icons8-globe-26.png'),
      twitterLink: require('../assets/icons8-twitter-filled-50.png'),
      blogLink: require('../assets/icons8-comments-32.png')
    };
    var linkNames = [
      'linkedInLink',
      'githubLink',
      'portfolioLink',
      'websiteLink',
      'twitterLink',
      'blogLink'
    ];
    renderedLinks = linkNames.map((link: string, index: number) => {
      if (user[link] !== '') {
        return (
          <a href={user[link]} key={'user-links-' + index}>
            <img className="public-profile-link-icons" src={imageLinks[link]} />
          </a>
        );
      } else {
        return null;
      }
    });

    return (
      <div className="public-profile-links-container">
        <div className="public-profile-header">Links</div>
        {renderedLinks}
      </div>
    );
  }
}

export default UserLinks;
