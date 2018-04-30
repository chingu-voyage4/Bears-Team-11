import * as React from 'react';
import Revision from './Revision';
import axios from 'axios';
import apiService from '../utils/apiService';
import { connect } from 'react-redux';

class Revisions extends React.PureComponent<
  { mockups: Array<string> | undefined; projectId: string; username: string },
  {
    revisions: Array<{
      _id: string;
      revisionNumber: string;
      description: string;
      creator: string;
      createdAt: string;
      finalVersion: boolean;
    }>;
    isLoading: boolean;
  }
> {
  constructor(props: {
    mockups: Array<string> | undefined;
    projectId: string;
    username: string;
  }) {
    super(props);
    this.state = {
      revisions: [],
      isLoading: false
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/projects/${this.props.projectId}/revisions`
      )
      .then(response => {
        var revisions = response.data.revisions;
        this.setState({
          revisions
        });
      });
  }

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
      .then(res => {
        this.setState({ isLoading: false });
        console.log(res);
      });
  };

  openFileSelectDialog = (e: any) => {
    e.preventDefault();
    var revisionUpload = document.getElementById('revisionUpload');
    if (revisionUpload) {
      revisionUpload.click();
    }
  };

  displayRevisions = () => {
    if (this.state.revisions.length > 0) {
      return this.state.revisions.map(revision => {
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
        <div className="revisions-list">{this.displayRevisions()}</div>
        {this.state.isLoading ? (
          <div className="new-project-image-loader" />
        ) : null}
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
