/* tslint:disable */
import * as React from 'react';
import * as shortid from 'shortid';

declare global {
  interface Window {
    $: any;
  }
}

class AnnotationLayer extends React.Component<
  { tool: any },
  { currentId: any; markers: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      markers: [
        {
          id: 'lilgangwolf-1',
          type: 'circle',
          comments: 5,
          creator: 'lilgangwolf',
          x: '20',
          y: '20'
        },
        {
          id: 'lilgangwolf-2',
          type: 'circle',
          creator: 'lilgangwolf',
          x: '100',
          y: '100'
        },
        {
          id: 'lilgangwolf-3',
          type: 'rectangle',
          creator: 'lilgangwolf',
          x: '200',
          y: '200',
          width: '100',
          height: '200'
        }
      ],
      currentId: '4'
    };
  }

  componentDidMount() {
    this.makeInteractive();
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
    this.state.markers.forEach((annotation: any) => {
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

  addMarker = (e: any) => {
    var marker: any;
    switch (this.props.tool) {
      case 'cursor':
        break;
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
      case 'comment':
        break;
      default:
        break;
    }
  };

  saveMarker = (marker: any) => {
    this.setState(prevState => {
      var newMarkerState = prevState.markers.slice();
      newMarkerState.push(marker);
      return {
        markers: newMarkerState
      };
    });
  };

  removeLastMarker = () => {
    this.setState(prevState => {
      var newMarkerState = prevState.markers.slice();
      newMarkerState.pop();
      return {
        markers: newMarkerState
      };
    });
  };

  drawRect = (id: any, x: any, y: any, width = 100, height = 100): any => {
    var style = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`
    };
    return (
      <div key={id} id={id} className="annotation-rectangle" style={style} />
    );
  };

  drawCircle = (id: any, x: any, y: any) => {
    var style = {
      top: `${y}px`,
      left: `${x}px`
    };
    return <div key={id} id={id} className="annotation-circle" style={style} />;
  };

  makeInteractive = () => {
    this.state.markers.forEach((marker: any) => {
      this.makeDraggable(marker.id);
      if (marker.type === 'rectangle') {
        this.makeResizeable(marker.id);
      }
    });
  };

  enableInteractivity = () => {
    this.state.markers.forEach((marker: any) => {
      this.enableDrag(marker.id);
      if (marker.type === 'rectangle') {
        this.enableResize(marker.id);
      }
    });
  };

  disableInteractivity = () => {
    this.state.markers.forEach((marker: any) => {
      this.disableDrag(marker.id);
      if (marker.type === 'rectangle') {
        this.disableResize(marker.id);
      }
    });
  };

  makeDraggable = (id: any) => {
    window.$(`#${id}`).draggable();
  };

  makeResizeable = (id: any) => {
    window.$(`#${id}`).resizable({ autoHide: true });
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
      </div>
    );
  }
}

export default AnnotationLayer;
