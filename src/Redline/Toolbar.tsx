/* tslint:disable */
import * as React from 'react';

interface ToolbarProps {
  isDisabled: boolean;
  tool: any;
  selectCursorTool: any;
  selectCircleTool: any;
  selectRectangleTool: any;
  selectCommentTool: any;
}

class Toolbar extends React.Component<ToolbarProps> {
  render() {
    if (this.props.isDisabled) {
      return (
        <div className="toolbar">
          <p className="toolbar__message">
            Only team members can access the tool bar 😅
          </p>
        </div>
      );
    }
    return (
      <div className="toolbar">
        <div>
          <ul className="toolbar__tools">
            <li
              className={
                this.props.tool === 'cursor'
                  ? 'toolbar__tool toolbar__tool--active'
                  : 'toolbar__tool'
              }
              onClick={this.props.selectCursorTool}
            >
              <i className="fas fa-mouse-pointer" />
            </li>
            <li
              className={
                this.props.tool === 'circle'
                  ? 'toolbar__tool toolbar__tool--active'
                  : 'toolbar__tool'
              }
              onClick={this.props.selectCircleTool}
            >
              <i className="fas fa-circle" />
            </li>
            <li
              className={
                this.props.tool === 'rectangle'
                  ? 'toolbar__tool toolbar__tool--active'
                  : 'toolbar__tool'
              }
              onClick={this.props.selectRectangleTool}
            >
              <i className="far fa-square" />
            </li>
            <li
              className={
                this.props.tool === 'comment'
                  ? 'toolbar__tool toolbar__tool--active'
                  : 'toolbar__tool'
              }
              onClick={this.props.selectCommentTool}
            >
              <i className="far fa-comment" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Toolbar;
