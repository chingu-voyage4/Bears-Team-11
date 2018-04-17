/* tslint:disable */
import * as React from 'react';
import '../styles/Redlines.css';
import Toolbar from './Toolbar';
import ImageLayer from './ImageLayer';
import AnnotationLayer from './AnnotationLayer';
import { connect } from 'react-redux';

// NOTE: Will have the revision id from the URL `projects/:projectId/revision/:revisionsId`
class Redline extends React.Component<
  { imageLink: string; match: any },
  { tool: string }
> {
  constructor(props: { imageLink: string; match: any }) {
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

  getURLParams = () => {
    return this.props.match.params;
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
          <div>
            <ImageLayer imageLink={this.props.imageLink} />
            <AnnotationLayer
              tool={this.state.tool}
              onMarkerAdd={this.selectCursorTool}
              revisionId={this.getURLParams().revisionId}
              projectId={this.getURLParams().projectId}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: {}) {
  return {
    imageLink:
      'http://www.relativelyinteresting.com/wp-content/uploads/2017/06/mini-kaiju-size-chart.jpg'
  };
}
export default connect(mapStateToProps)(Redline);
