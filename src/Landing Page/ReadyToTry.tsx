import * as React from 'react';
import '../styles/ReadyToTry.css';
import { connect, Dispatch } from 'react-redux';
import { showRegisterWindow } from '../actions/appActions';
import { Store, ReadyToTryProps, Action } from '../types/Redux';

class ReadyToTry extends React.Component<ReadyToTryProps, {}> {
  constructor(props: ReadyToTryProps) {
    super(props);
  }
  registerPressed = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showRegisterWindow();
  };
  render() {
    return (
      <div className="ready-to-try-container">
        <h1 className="ready-to-try-text">Ready to try Project Match?</h1>
        <button
          onClick={e => this.registerPressed(e)}
          className="ready-to-try-button"
        >
          SIGN UP FOR FREE
        </button>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    visibleRegisterWindow: state.registerLoginWindow.visibleRegisterWindow
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    showRegisterWindow: () => {
      return dispatch(showRegisterWindow());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadyToTry);
