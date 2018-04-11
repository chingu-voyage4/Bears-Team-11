/* tslint:disable */
import * as React from 'react';
import '../styles/Redlines.css';
import Toolbar from './Toolbar';
import ImageLayer from './ImageLayer';
import AnnotationLayer from './AnnotationLayer';

class Redline extends React.Component<{}, { tool: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      tool: 'cursor'
    };
  }

  // NOTE: Possibly make a generic tool function
  selectCursorTool = () => {
    this.setState({ tool: 'cursor' });
  };

  selectCircleTool = () => {
    this.setState({ tool: 'circle' });
  };

  selectRectangleTool = () => {
    this.setState({ tool: 'rectangle' });
  };

  selectCommentTool = () => {
    this.setState({ tool: 'comment' });
  };

  render() {
    return (
      <div className="redline-container">
        <Toolbar
          tool={this.state.tool}
          selectCursorTool={this.selectCursorTool}
          selectCircleTool={this.selectCircleTool}
          selectRectangleTool={this.selectRectangleTool}
          selectCommentTool={this.selectCommentTool}
        />
        <div className="redline-canvas">
          <ImageLayer />
          <AnnotationLayer
            tool={this.state.tool}
            onMarkerAdd={this.selectCursorTool}
          />
        </div>
      </div>
    );
  }
}

export default Redline;
