import * as React from 'react';
import './styles/App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import LandingPage from './Landing Page/LandingPage';
import Register from './Register-Login Page/Register';

// tslint:disable-next-line
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Register />
          <LandingPage />
        </div>
      </Provider>
    );
  }
}

export default App;
