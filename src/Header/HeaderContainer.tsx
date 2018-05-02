import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import LoggedInHeader from './LoggedInHeader';
import { HeaderContainerProps } from '../types/HeaderContainer.d';
import { Store, State } from '../types/Redux';
import { Redirect } from 'react-router-dom';
import { completeRegistration } from '../actions/appActions';

class HeaderContainer extends React.Component<HeaderContainerProps, State> {
  constructor(props: HeaderContainerProps) {
    super(props);
  }
  render() {
    let isUserLoggedIn = false;
    if (this.props.user.email) {
      isUserLoggedIn = true;
    }
    if (this.props.justRegistered) {
      this.props.completeRegistration();
      return <Redirect to="/user/settings" />;
    } else {
      return (
        <div>{isUserLoggedIn === true ? <LoggedInHeader /> : <Header />}</div>
      );
    }
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    justRegistered: state.registerLoginWindow.justRegistered
  };
}

export default connect(mapStateToProps, { completeRegistration })(
  HeaderContainer
);
