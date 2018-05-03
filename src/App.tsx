import * as React from 'react';
import './styles/App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectsPage from './ProjectsPage/ProjectsPage';
import AddProjectsPage from './AddProjectsPage/AddProjectsPage';
import SettingsPage from './UserProfileAndSettingsPage/SettingsPage';
import PublicProfile from './PublicProfile/PublicProfile';
import Redline from './Redline';
import ProjectPortalPage from './ProjectPortalPage';
import { HYDRATE_USER } from './actions/actionTypes';
import config from './.config';

if (config.env !== 'production') {
  console.log('create-react-app is running in', config.env);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

var user = localStorage.getItem('user');
if (user) {
  store.dispatch({
    type: HYDRATE_USER,
    data: JSON.parse(user)
  });
}

class App extends React.Component {
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
                path="/projects/:id"
                component={ProjectPortalPage}
              />
              <Route
                exact={true}
                path="/projects/:projectId/revision/:revisionId"
                component={Redline}
              />
              <Route
                exact={true}
                path="/projects/update/:id"
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
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
