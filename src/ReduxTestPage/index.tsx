import * as React from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import { login, register, logout } from '../actions/userActions';
import { Store, Props, State } from '../types/Redux';

class ReduxTestPage extends React.Component<Props, State> {
  handleLogin = () => {
    this.props.login('gramsay@gmail.com', 'masterchef');
  };

  handleRegister = () => {
    this.props.register('Hannah', 'Montana', 'montana@gmail.com', '123456');
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleGetProjects = () => {
    this.props.getProjects();
  };

  render() {
    return (
      <div style={{ background: '#FFECB3', height: '100vh' }}>
        <h1>Redux Manual Test Tool</h1>
        <ul>
          <li>
            <span onClick={this.handleLogin}>Login</span>
          </li>
          <li>
            <span onClick={this.handleRegister}>Register</span>
          </li>
          <li>
            <span onClick={this.handleLogout}>Logout</span>
          </li>
          <li>
            <span onClick={this.handleGetProjects}>Get Projects</span>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects
  };
}

export default connect(mapStateToProps, {
  getProjects,
  login,
  register,
  logout
})(ReduxTestPage);
