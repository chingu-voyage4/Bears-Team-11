import * as React from 'react';
import './styles/App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import LandingPage from './Landing Page/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectsPage from './Projects Page/ProjectsPage';
// tslint:disable-next-line
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/projects" component={ProjectsPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
