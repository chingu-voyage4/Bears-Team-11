/* tslint:disable */
import * as React from 'react';
import * as shortid from 'shortid';
import CommentBox from './CommentBox';
import { connect } from 'react-redux';
import {
  getMarkers,
  addMarker,
  moveMarker,
  addComment
} from '../actions/markerActions';
import { Store } from '../types/Redux';
import { Marker } from '../types/Marker';

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
  addMarker: any;
  getMarkers: any;
  moveMarker: any;
  addComment: any;
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
            annotation.id,
            annotation.x,
            annotation.y,
            annotation.width,
            annotation.height
          )
        );
      } else {
        markers.push(
          this.drawCircle(annotation.id, annotation.x, annotation.y)
        );
      }
    });
    return markers;
  };

  // BUG: annotation canvas does not wrap the image
  addMarker = (e: any) => {
    var marker: any;
    switch (this.props.tool) {
      case 'circle':
        // center the cursor (toolbar offset + height offset)
        marker = {
          id: shortid.generate(),
          x: e.pageX - 21,
          y: e.pageY - 71,
          type: 'circle'
        };
        this.saveMarker(marker);
        break;
      case 'rectangle':
        // center the cursor
        marker = {
          id: shortid.generate(),
          x: e.pageX - 50,
          y: e.pageY - 100,
          width: 100,
          height: 100,
          type: 'rectangle'
        };
        this.saveMarker(marker);
        break;
      default:
        break;
    }
  };

  saveMarker = (marker: Marker) => {
    this.props.addMarker(this.props.revisionId, marker);
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

  drawRect = (id: any, x: any, y: any, width = 100, height = 100): any => {
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
        <CommentBox markerId={id} revisionId={this.props.revisionId} />
      </div>
    );
  };

  drawCircle = (id: any, x: any, y: any) => {
    var style = {
      top: `${y}px`,
      left: `${x}px`
    };
    return (
      <div
        key={id}
        id={id}
        className="annotation-circle"
        style={style}
        onClick={this.toggleCommentBox}
      >
        <CommentBox markerId={id} revisionId={this.props.revisionId} />
      </div>
    );
  };

  makeInteractive = () => {
    this.props.markers.forEach((marker: any) => {
      this.makeDraggable(marker.id);
      if (marker.type === 'rectangle') {
        this.makeResizeable(marker.id);
      }
    });
  };

  enableInteractivity = () => {
    this.props.markers.forEach((marker: any) => {
      this.enableDrag(marker.id);
      if (marker.type === 'rectangle') {
        this.enableResize(marker.id);
      }
    });
  };

  disableInteractivity = () => {
    this.props.markers.forEach((marker: any) => {
      this.disableDrag(marker.id);
      if (marker.type === 'rectangle') {
        this.disableResize(marker.id);
      }
    });
  };

  makeDraggable = (id: any) => {
    window.$(`#${id}`).draggable({
      stop: () => {
        var marker = document.getElementById(id);
        if (marker) {
          var position = marker.getBoundingClientRect();
          this.props.moveMarker(
            this.props.revisionId,
            id,
            position.left,
            position.top - 75, // adjust for toolbar + padding
            position.width - 4, // adjust for border
            position.height - 4 // adjust for border
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
          this.props.moveMarker(
            id,
            position.left,
            position.top - 75, // adjust for toolbar + padding
            position.width - 4, // adjust for border
            position.height - 4 // adjust for border
          );
        }
      }
    });
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
      </div>
    );
  }
}

function mapStateToProps(state: Store, ownProps: any) {
  return {
    markers: state.markers
  };
}

export default connect(mapStateToProps, {
  getMarkers,
  addMarker,
  moveMarker,
  addComment
})(AnnotationLayer);
