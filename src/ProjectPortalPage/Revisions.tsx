import * as React from 'react';
import Revision from './Revision';
import axios from 'axios';

class Revisions extends React.PureComponent<
  { mockups: Array<string> | undefined; projectId: string },
  {
    revisions: Array<{
      _id: string;
      revisionNumber: string;
      description: string;
      creator: string;
      createdAt: string;
      finalVersion: boolean;
    }>;
  }
> {
  constructor(props: {
    mockups: Array<string> | undefined;
    projectId: string;
  }) {
    super(props);
    this.state = {
      revisions: []
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
          <a className="upload-link" href="">
            upload new document <i className="fas fa-cloud-upload-alt fa-2x" />
          </a>
        </div>
        <div className="revisions-list">{this.displayRevisions()}</div>
      </React.Fragment>
    );
  }
}

export default Revisions;
