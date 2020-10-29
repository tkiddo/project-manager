import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './app';
import ErrorBoundary from './components/ErrorBoundary';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
