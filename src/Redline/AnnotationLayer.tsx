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

interface AnnotationLayerProps {
  tool: any;
  onMarkerAdd: any;
  revisionId: string;
  projectId: string;
  markers: Array<Marker>;
  user: User | any;
  addMarker: any;
  getMarkers: any;
  moveMarker: any;
  addComment: any;
  resolveMarker: any;
  deleteMarker: any;
  resizeMarker: any;
}

class AnnotationLayer extends React.Component<AnnotationLayerProps> {
  componentDidMount() {
    this.props.getMarkers(this.props.revisionId).then(() => {
      this.makeInteractive();
    });
  }

  componentDidUpdate(nextProps: any) {
    this.makeInteractive();
    if (nextProps.tool !== 'cursor' && this.props.tool === 'cursor') {
      this.disableInteractivity();
    } else if (nextProps.tool === 'cursor' && this.props.tool !== 'cursor') {
      this.enableInteractivity();
    }
  }

  isTeamMember = () => {
    if (this.props.user._id) {
      return this.props.user.projects.some(
        (id: string) => id === this.props.projectId
      );
    }
    return false;
  };

  drawMarkers = () => {
    var markers: any = [];
    this.props.markers.forEach((marker: any) => {
      if (marker.type === 'rectangle') {
        markers.push(this.drawRect(marker));
      } else {
        markers.push(this.drawCircle(marker));
      }
    });
    return markers;
  };

  drawRect = (marker: Marker): any => {
    var { _id, x, y, isResolved, creator, width, height } = marker;
    var style = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${width || 100}px`,
      height: `${height || 100}px`,
      backgroundColor: isResolved ? 'rgba(249,166,33,0.5)' : null,
      borderColor: isResolved ? '#f9a621' : null
    };
    return (
      <div
        key={_id}
        id={_id}
        className="annotation-rectangle"
        style={style}
        onClick={this.toggleCommentBox}
      >
        <CommentBox
          key={_id}
          markerId={_id}
          revisionId={this.props.revisionId}
          deleteMarker={this.deleteMarker}
          resolveMarker={this.resolveMarker}
          isResolved={isResolved}
        />
        <div className="annotation-initials">{creator}</div>
      </div>
    );
  };

  drawCircle = (marker: Marker) => {
    var { _id, x, y, isResolved, creator } = marker;
    var style = {
      top: `${y}px`,
      left: `${x}px`,
      backgroundColor: isResolved ? '#f9a621' : null
    };

    return (
      <div
        key={_id}
        id={_id}
        className="annotation-circle"
        style={style}
        onClick={this.toggleCommentBox}
      >
        <CommentBox
          key={_id}
          markerId={_id}
          revisionId={this.props.revisionId}
          deleteMarker={this.deleteMarker}
          resolveMarker={this.resolveMarker}
          isResolved={isResolved}
        />
        <div className="annotation-initials">{creator}</div>
      </div>
    );
  };

  addMarker = (e: any) => {
    if (this.isTeamMember()) {
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
