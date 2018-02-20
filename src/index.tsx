import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

ReactDOM.render(
  <Header />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
