/* tslint:disable */
import * as React from 'react';
import '../styles/Redlines.css';
import Toolbar from './Toolbar';
import ImageLayer from './ImageLayer';
import AnnotationLayer from './AnnotationLayer';
import axios from 'axios';
import HeaderContainer from '../Header/HeaderContainer';
import { connect } from 'react-redux';
import config from '../.config';

interface RedlineProps {
  imageLink: string;
  match: any;
  user: any;
}

interface RedlineState {
  tool: string;
  revision: any;
  team: Array<string>;
}

class Redline extends React.Component<RedlineProps, RedlineState> {
  constructor(props: RedlineProps) {
    super(props);
    this.state = {
      tool: 'cursor',
      revision: {},
      team: []
    };
  }

  componentDidMount() {
    var { revisionId } = this.getURLParams();
    axios
      .get(config.host.name + `/api/projects/revision/${revisionId}`)
      .then(response => {
        this.setState({
          revision: response.data.revision
        });
      });

    axios
      .get(
        config.host.name + `/api/projects/${this.getURLParams().projectId}/team`
      )
      .then(response => {
        var team = response.data.team;
        this.setState({ team });
      });
  }
  selectTool = (tool: string) => {
    this.setState({ tool });
  };

  getURLParams = () => {
    return this.props.match.params;
  };

  isTeamMember = () => {
    if (this.props.user._id && this.state.team) {
      return this.state.team.some(teammember => {
        return teammember === this.props.user.username;
      });
    }
    return false;
  };

  shouldDisableToolBar = () => {
    return !this.isTeamMember();
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
