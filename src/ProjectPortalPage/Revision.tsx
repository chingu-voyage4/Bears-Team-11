import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

interface RevisionProps {
  revision: any;
  projectId: string;
}

class Revision extends React.PureComponent<RevisionProps> {
  render() {
    return (
      <div className="revision">
        <div className="revision__image_container">
          <Link
            to={`/projects/${this.props.projectId}/revision/${
              this.props.revision._id
            }`}
          >
            <img
              className="revision__image"
              src={this.props.revision.imageURL}
              alt=""
            />
            {/* <div className="revision__changes">{}</div> */}
          </Link>
        </div>
        <h3 className="revision__title">
          Revision {this.props.revision.revisionNumber}
        </h3>
        <p className="revision__author">
          author: {this.props.revision.creator} | date:{' '}
          {moment(this.props.revision.createdAt).format('ll')}
        </p>
        <p>{this.props.revision.description}</p>
        <span
          className={
            this.props.revision.finalVersion ? 'revision__version' : ''
          }
        >
          {this.props.revision.finalVersion ? 'Final Version' : null}
        </span>
      </div>
    );
  }
}

export default Revision;
