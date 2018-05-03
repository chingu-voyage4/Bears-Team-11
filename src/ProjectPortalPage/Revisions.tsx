import * as React from 'react';
import Revision from './Revision';
import axios from 'axios';
import apiService from '../utils/apiService';
import { connect } from 'react-redux';
import config from '../.config';

interface RevisionsProps {
  mockups: Array<string> | undefined;
  projectId: string;
  username: string;
}

interface RevisionsState {
  revisions: Array<{
    _id: string;
    revisionNumber: string;
    description: string;
    creator: string;
    createdAt: string;
    finalVersion: boolean;
  }>;
  isLoading: boolean;
  team: Array<string>;
}

class Revisions extends React.PureComponent<RevisionsProps, RevisionsState> {
  constructor(props: RevisionsProps) {
    super(props);
    this.state = {
      revisions: [],
      isLoading: false,
      team: []
    };
  }
  componentDidMount() {
    axios
      .get(config.host.name + `/api/projects/${this.props.projectId}/revisions`)
      .then(response => {
        var revisions = response.data.revisions;
        this.setState({
          revisions
        });
      });

    axios
      .get(config.host.name + `/api/projects/${this.props.projectId}/team`)
      .then(response => {
        var team = response.data.team;
        this.setState({ team });
      });
  }

  isTeamMember = () => {
    if (this.props.username && this.state.team) {
      return this.state.team.some(teammember => {
        return teammember === this.props.username;
      });
    }
    return false;
  };

  handleFile = (e: any) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    apiService
      .uploadRevisionImage(
        e.target.files,
        this.props.projectId,
        this.props.username,
        this.state.revisions.length + 1
      )
      .then(revision => {
        this.setState(prevState => {
          var newRevisions = prevState.revisions.slice();
          newRevisions.push(revision);
          return {
            isLoading: false,
            revisions: newRevisions
          };
        });
      });
  };

  openFileSelectDialog = (e: any) => {
    e.preventDefault();
    if (this.isTeamMember()) {
      var revisionUpload = document.getElementById('revisionUpload');
      if (revisionUpload) {
        revisionUpload.click();
      }
    }
  };

  displayRevisions = () => {
    if (this.state.revisions.length > 0) {
      return this.state.revisions
        .slice()
        .reverse()
        .map(revision => {
          return (
            <Revision
              key={revision._id}
              revision={revision}
              projectId={this.props.projectId}
            />
          );
        });
    }
    return null;
  };

  render() {
    return (
      <React.Fragment>
        <div className="upload-link__container">
          <input
            id="revisionUpload"
            type="file"
            hidden={true}
            onChange={this.handleFile}
          />
          <a
            className="upload-link"
            href=""
            onClick={this.openFileSelectDialog}
          >
            upload new document <i className="fas fa-cloud-upload-alt fa-2x" />
          </a>
        </div>
        {this.state.isLoading ? <div className="loader" /> : null}
        <div className="revisions-list">{this.displayRevisions()}</div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    username: state.user.username
  };
}

export default connect(mapStateToProps)(Revisions);
