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
import AddProjectsPage from './AddProjectsPage/AddProjectsPage';
import SettingsPage from './UserProfileAndSettingsPage/SettingsPage';
import PublicProfile from './UserProfileAndSettingsPage/PublicProfile';
import ProjectPortalPage from './ProjectPortalPage/ProjectPortalPage';

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
          <Router>
            <Switch>
              <Route exact={true} path="/" component={LandingPage} />
              <Route exact={true} path="/home" component={LandingPage} />
              <Route exact={true} path="/projects" component={ProjectsPage} />
              <Route
                exact={true}
                path="/projects/add"
                component={AddProjectsPage}
              />
              <Route
                exact={true}
                path="/user/settings"
                component={SettingsPage}
              />
              <Route
                exact={true}
                path="/user/profile"
                component={PublicProfile}
              />
              <Route path="/projects/:id" component={ProjectPortalPage} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
