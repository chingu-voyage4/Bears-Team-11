import * as React from 'react';
import './styles/App.css';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Footer />
      </div>
    );
  }
}

export default App;
