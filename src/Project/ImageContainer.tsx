import { Link } from 'react-router-dom';
import * as React from 'react';
import '../styles/Project.css';

export class ImageContainer extends React.Component<
  { project: any; projId: any },
  {}
> {
  render() {
    var data = this.props.project;
    return (
      <Link to={'/projects/' + this.props.projId}>
        <img
          className="project-image"
          alt={data.name}
          src={
            data.images === [] ||
            data.images![0] === undefined ||
            data.images![0] === null
              ? require('../assets/imagePlaceholder.jpg')
              : data.images![0]
          }
        />
      </Link>
    );
  }
}

export class EditImageContainer extends React.Component<
  { project: any; projId: any },
  {}
> {
  render() {
    var data = this.props.project;
    return (
      <Link
        to={'/projects/' + this.props.projId}
        className="project-edit-image-container"
      >
        <img
          className="project-edit-image"
          alt={data.name}
          src={
            data.images!.length === 0 ||
            data.images === undefined ||
            data.images === null
              ? require('../assets/imagePlaceholder.jpg')
              : data.images[0]
          }
        />
      </Link>
    );
  }
}
