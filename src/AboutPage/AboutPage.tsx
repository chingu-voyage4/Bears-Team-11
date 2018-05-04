import * as React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import Footer from '../Footer/Footer';
import '../styles/AboutPage.css';

class TeamContainer extends React.Component {
  render() {
    var team = [];
    var githubIcon = require('../assets/icons8-github-50.png');
    var teamComponent;
    team.push(
      {
        name: 'Francesca Sadikin',
        github: 'https://github.com/serpient',
        image: require('../assets/FrancescaSadikin.jpg'),
        title: 'Co-PM | Designer | Full-Stack Web Dev'
      },
      {
        name: 'Tony Luo',
        github: 'https://github.com/luoto',
        image: require('../assets/TonyLuo.jpg'),
        title: 'Co-PM | Full-Stack Web Dev'
      },
      {
        name: 'Thulasiram Peddiboina',
        github: 'https://github.com/ilvcs',
        image: require('../assets/ThulasiramPeddiboina.jpg'),
        title: 'Back-End Web Dev'
      },
      {
        name: 'Eric Miller',
        github: 'https://github.com/ericmiller777',
        image: require('../assets/EricMiller.png'),
        title: 'Front-End Web Dev'
      }
    );
    teamComponent = team.map((person: any, index: number) => {
      return (
        <div key={'team_person_' + index} className="team-person-card">
          <img className="team-person-image" src={person.image} />
          <div className="team-person-info">
            <div className="team-person-name">{person.name}</div>
            <div className="team-person-title">{person.title}</div>
            <a href={person.github}>
              <img className="team-person-github-icon" src={githubIcon} />
            </a>
          </div>
        </div>
      );
    });

    return (
      <div className="about-container">
        {teamComponent}
        <div className="about-project-match">
          <div className="about-project-match-header">Hello!</div>
          <div className="about-project-match-text">
            {/* tslint:disable-next-line */}
            Project Match is our experiment to improve the project completion
            rate for remote teams. We find that programming teams have higher
            chances of success if they have a design mockup to build against.
            Thus, by matching designers with programmers and providing teams
            with collaboration tools, we hope our project will smooth the way to
            project completion.
            <br />
            <br />
            {/* tslint:disable-next-line */}
            Please feel free to contact us if you have any comments about
            Project Match. We look forward to seeing you on the site!
          </div>
        </div>
      </div>
    );
  }
}

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <TeamContainer />
        <Footer />
      </div>
    );
  }
}

export default AboutPage;
