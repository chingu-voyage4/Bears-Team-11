import * as React from 'react';
import './styles/App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import LandingPage from './Landing Page/LandingPage';
import ReduxTestPage from './ReduxTestPage';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
class App extends React.Component<{}, { reduxManualTest: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      reduxManualTest: false
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {this.state.reduxManualTest ? <ReduxTestPage /> : null}
          <LandingPage />
        </div>
      </Provider>
    );
  }
}

export default App;
