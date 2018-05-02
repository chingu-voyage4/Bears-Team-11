/* tslint:disable */
import * as React from 'react';
import '../styles/Redlines.css';
import Toolbar from './Toolbar';
import ImageLayer from './ImageLayer';
import AnnotationLayer from './AnnotationLayer';
import axios from 'axios';
import HeaderContainer from '../Header/HeaderContainer';
import { connect } from 'react-redux';

interface RedlineProps {
  imageLink: string;
  match: any;
  user: any;
}

interface RedlineState {
  tool: string;
  revision: any;
}

class Redline extends React.Component<RedlineProps, RedlineState> {
  constructor(props: RedlineProps) {
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
  selectTool = (tool: string) => {
    this.setState({ tool });
  };

  getURLParams = () => {
    return this.props.match.params;
  };

  shouldDisableToolBar = () => {
    if (this.props.user._id) {
      return !this.props.user.projects.some((projectId: any) => {
        return projectId === this.getURLParams().projectId;
      });
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
            selectCursorTool={() => this.selectTool('cursor')}
            selectCircleTool={() => this.selectTool('circle')}
            selectRectangleTool={() => this.selectTool('rectangle')}
            selectCommentTool={() => this.selectTool('comment')}
          />
          <div className="redline-canvas">
            <div>
              <AnnotationLayer
                tool={this.state.tool}
                onMarkerAdd={() => this.selectTool('cursor')}
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
