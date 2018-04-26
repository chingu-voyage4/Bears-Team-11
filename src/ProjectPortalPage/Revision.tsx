import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

class Revision extends React.PureComponent<
  {
    revision: {
      _id: string;
      revisionNumber: string;
      description: string;
      creator: string;
      createdAt: string;
      finalVersion: boolean;
    };
    projectId: string;
  },
  {}
> {
  render() {
    return (
      <div className="revision">
        <div className="revision__image_container">
          <Link
            to={`/projects/${this.props.projectId}/revision/${
              this.props.revision._id
            }`}
          >
            <img src="http://via.placeholder.com/350x150" alt="" />
            {/* <div className="revision__changes">{}</div> */}
          </Link>
        </div>
        <h3 className="revision__title">
          Revision {this.props.revision.revisionNumber} -{' '}
          {this.props.revision.description}
        </h3>
        <p className="revision__author">
          author: {this.props.revision.creator} | date:{' '}
          {moment(this.props.revision.createdAt).format('ll')}
        </p>
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
