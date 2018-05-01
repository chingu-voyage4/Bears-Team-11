/* tslint:disable */
import * as React from 'react';
import '../styles/Redlines.css';
import Toolbar from './Toolbar';
import ImageLayer from './ImageLayer';
import AnnotationLayer from './AnnotationLayer';
import axios from 'axios';
import HeaderContainer from '../Headers&Footers/HeaderContainer';
import { connect } from 'react-redux';

class Redline extends React.Component<
  { imageLink: string; match: any; user: any },
  {
    tool: string;
    revision: any;
  }
> {
  constructor(props: { imageLink: string; match: any; user: any }) {
    super(props);
    this.state = {
      tool: 'cursor',
      revision: {}
    };
  }

  componentDidMount() {
    var { revisionId } = this.getURLParams();
    axios
      .get(`http://localhost:8080/api/projects/revision/${revisionId}`)
      .then(response => {
        this.setState({
          revision: response.data.revision
        });
      });
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

  shouldDisableToolBar = () => {
    if (this.props.user._id) {
      return this.props.user.projects.some(
        (projectId: any) => projectId === this.getURLParams().projectId
      );
    } else {
      return true;
    }
  };

  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        <div className="redline-container">
          <Toolbar
            isDisabled={this.shouldDisableToolBar()}
            tool={this.state.tool}
            selectCursorTool={this.selectCursorTool}
            selectCircleTool={this.selectCircleTool}
            selectRectangleTool={this.selectRectangleTool}
            selectCommentTool={this.selectCommentTool}
          />
          <div className="redline-canvas">
            <div>
              <AnnotationLayer
                tool={this.state.tool}
                onMarkerAdd={this.selectCursorTool}
                revisionId={this.getURLParams().revisionId}
                projectId={this.getURLParams().projectId}
              >
                <ImageLayer imageLink={this.state.revision.imageURL} />
              </AnnotationLayer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Redline);
