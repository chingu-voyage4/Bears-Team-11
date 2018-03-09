import * as React from 'react';
import './styles/App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import LandingPage from './Landing Page/LandingPage';
import ReduxTestPage from './ReduxTestPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectsPage from './Projects Page/ProjectsPage';
import AddProjectsPage from './AddProjectsPage/AddProjectsPage';
const store = createStore(
  userReducer,
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
          <Router>
            <Switch>
              <Route exact={true} path="/" component={LandingPage} />
              <Route exact={true} path="/projects" component={ProjectsPage} />
              <Route exact={true} path="/addproject" component={AddProjectsPage} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
