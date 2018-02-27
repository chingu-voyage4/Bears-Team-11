import * as React from 'react';
import './styles/App.css';
// import LandingPage from './Landing Page/LandingPage';
import Register from './Register-Login Page/Register';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Register />
      </div>
    );
  }
}

export default App;
