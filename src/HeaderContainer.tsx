import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import LoggedInHeader from './LoggedInHeader';
import { HeaderContainerProps } from './types/HeaderContainer.d';
import { Store, State } from './types/Redux';

class HeaderContainer extends React.Component<HeaderContainerProps, State> {
  render() {
    let isUserLoggedIn = false;
    if (this.props.user.email) {
      isUserLoggedIn = true;
    }
    return (
      <div>{isUserLoggedIn === true ? <LoggedInHeader /> : <Header />}</div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(HeaderContainer);
