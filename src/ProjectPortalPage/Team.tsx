import * as React from 'react';
import axios from 'axios';
import config from '../.config';

interface TeamProps {
  projectId: string;
}

interface TeamState {
  thumbnails: Array<string>;
}
class Team extends React.PureComponent<TeamProps, TeamState> {
  constructor(props: TeamProps) {
    super(props);
    this.state = {
      thumbnails: []
    };
  }
  componentDidMount() {
    axios
      .get(
        config.host.name +
          `/api/projects/${this.props.projectId}/team/thumbnails`
      )
      .then(response => {
        var thumbnails = response.data.thumbnailsURLs;
        this.setState({
          thumbnails: thumbnails as Array<string>
        });
      });
  }

  displayThumbnails = () => {
    if (this.state.thumbnails) {
      return this.state.thumbnails.map(url => {
        return (
          <li key={url} className="team__list-item">
            <a href="">
              <img className="team__thumbnail" src={url} alt="" />
            </a>
          </li>
        );
      });
    }
    return null;
  };

  render() {
    return (
      <React.Fragment>
        <h3>Team:</h3>
        <ul className="team__list">{this.displayThumbnails()}</ul>
      </React.Fragment>
    );
  }
}

export default Team;
