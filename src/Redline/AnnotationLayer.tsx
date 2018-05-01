/* tslint:disable */
import * as React from 'react';
import CommentBox from './CommentBox';
import { connect } from 'react-redux';
import {
  getMarkers,
  addMarker,
  moveMarker,
  resizeMarker,
  addComment,
  resolveMarker,
  deleteMarker
} from '../actions/markerActions';
import { Store } from '../types/Redux';
import { Marker } from '../types/Marker';
import { User } from '../types/User';

declare global {
  interface Window {
    $: any;
  }
}

class AnnotationLayer extends React.Component<{
  tool: any;
  onMarkerAdd: any;
  revisionId: string;
  projectId: string;
  markers: Array<Marker>;
  user: User;
  addMarker: any;
  getMarkers: any;
  moveMarker: any;
  addComment: any;
  resolveMarker: any;
  deleteMarker: any;
  resizeMarker: any;
}> {
  componentDidMount() {
    this.props.getMarkers(this.props.revisionId).then(() => {
      this.makeInteractive();
    });
  }

  componentWillReceiveProps(nextProps: any) {
    // TODO: need a better way to toggle states
    this.makeInteractive();
    if (nextProps.tool !== 'cursor' && this.props.tool === 'cursor') {
      this.disableInteractivity();
    } else if (nextProps.tool === 'cursor' && this.props.tool !== 'cursor') {
      this.enableInteractivity();
    }
  }

  drawMarkers = () => {
    var markers: any = [];
    this.props.markers.forEach((annotation: any) => {
      if (annotation.type === 'rectangle') {
        markers.push(
          this.drawRect(
            annotation._id,
            annotation.x,
            annotation.y,
            annotation.isResolved
          )
        );
      } else {
        markers.push(
          this.drawCircle(
            annotation._id,
            annotation.x,
            annotation.y,
            annotation.isResolved
          )
        );
      }
    });
    return markers;
  };

  addMarker = (e: any) => {
    var marker: any;
    var { left, top } = e.target.getBoundingClientRect();

    switch (this.props.tool) {
      case 'circle':
        marker = {
          x: e.pageX - left - 21,
          y: e.pageY - top - 21,
          type: 'circle',
          creator: this.props.user.username
        };
        this.saveMarker(marker);
        break;
      case 'rectangle':
        // center the cursor
        marker = {
          x: e.pageX - left - 50,
          y: e.pageY - top - 50,
          width: 100,
          height: 100,
          type: 'rectangle',
          creator: this.props.user.username
        };
        this.saveMarker(marker);
        break;
      default:
        break;
    }
  };

  saveMarker = (marker: Marker) => {
    this.props.addMarker(
      this.props.revisionId,
      marker,
      this.props.user.username
    );
    this.props.onMarkerAdd();
  };

  toggleCommentBox = (e: any) => {
    if (this.props.tool === 'comment') {
      var target = e.currentTarget;
      var child = target.firstChild;
      if (child.style.display === 'none') {
        child.style.display = 'block';
      } else {
        child.style.display = 'none';
      }
    }
  };

  drawRect = (
    id: any,
    x: any,
    y: any,
    isResolved: any,
    width = 100,
    height = 100
  ): any => {
    var style = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`
    };
    return (
      <div
        key={id}
        id={id}
        className="annotation-rectangle"
        style={style}
        onClick={this.toggleCommentBox}
      >
        {isResolved ? (
          <div>
            <i className="fas fa-check" />
          </div>
        ) : null}
        <CommentBox
          key={id}
          markerId={id}
          revisionId={this.props.revisionId}
          deleteMarker={this.deleteMarker}
          resolveMarker={this.resolveMarker}
          isResolved={isResolved}
        />
      </div>
    );
  };

  drawCircle = (id: any, x: any, y: any, isResolved: any) => {
    var style = {
      top: `${y}px`,
      left: `${x}px`,
      backgroundColor: isResolved ? '#f9a621' : null
    };

    return (
      <div
        key={id}
        id={id}
        className="annotation-circle"
        style={style}
        onClick={this.toggleCommentBox}
      >
        <CommentBox
          key={id}
          markerId={id}
          revisionId={this.props.revisionId}
          deleteMarker={this.deleteMarker}
          resolveMarker={this.resolveMarker}
          isResolved={isResolved}
        />
      </div>
    );
  };

  makeInteractive = () => {
    this.props.markers.forEach((marker: any) => {
      if (marker.creator === this.props.user.username) {
        this.makeDraggable(marker._id);
        if (marker.type === 'rectangle') {
          this.makeResizeable(marker._id);
        }
      }
    });
  };

  enableInteractivity = () => {
    this.props.markers.forEach((marker: any) => {
      if (marker.creator === this.props.user.username) {
        this.enableDrag(marker._id);
        if (marker.type === 'rectangle') {
          this.enableResize(marker._id);
        }
      }
    });
  };

  disableInteractivity = () => {
    this.props.markers.forEach((marker: any) => {
      if (marker.creator === this.props.user.username) {
        this.disableDrag(marker._id);
        if (marker.type === 'rectangle') {
          this.disableResize(marker._id);
        }
      }
    });
  };

  makeDraggable = (id: any) => {
    window.$(`#${id}`).draggable({
      stop: () => {
        var marker = document.getElementById(id);
        if (marker && marker.parentElement) {
          var offset = marker.parentElement.getBoundingClientRect();
          var position = marker.getBoundingClientRect();
          this.props.moveMarker(
            id,
            position.left - offset.left,
            position.top - offset.top
          );
        }
      }
    });
  };

  makeResizeable = (id: any) => {
    window.$(`#${id}`).resizable({
      autoHide: true,
      stop: () => {
        var marker = document.getElementById(id);
        if (marker) {
          var position = marker.getBoundingClientRect();
          this.props.resizeMarker(
            id,
            position.width - 4, // adjust for border
            position.height - 4 // adjust for border
          );
        }
      }
    });
  };

  resolveMarker = (markerId: any) => {
    this.props.resolveMarker(markerId);
  };

  deleteMarker = (markerId: any) => {
    this.props.deleteMarker(markerId);
  };

  // TODO: make into one function?
  disableDrag = (id: any) => {
    window.$(`#${id}`).draggable('disable');
  };

  disableResize = (id: any) => {
    window.$(`#${id}`).resizable('disable');
  };

  enableDrag = (id: any) => {
    window.$(`#${id}`).draggable('enable');
  };

  enableResize = (id: any) => {
    window.$(`#${id}`).resizable('enable');
  };

  render() {
    return (
      <div className="redline-annotations" onClick={this.addMarker}>
        {this.drawMarkers()}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state: Store, ownProps: any) {
  return {
    markers: state.markers,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  getMarkers,
  addMarker,
  moveMarker,
  resizeMarker,
  addComment,
  resolveMarker,
  deleteMarker
})(AnnotationLayer);
